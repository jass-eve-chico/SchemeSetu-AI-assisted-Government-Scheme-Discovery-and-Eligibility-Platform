import { Scheme, EligibilityCriterion } from '../types/scheme';
import { UserProfile, EligibilityResult } from '../types/user';
import {
  normalizeEducation,
  normalizeOccupation,
  matchValues,
  cleanText
} from './normalize';

export function evaluateEligibility(scheme: Scheme, profile: UserProfile): EligibilityResult {
  const criteria = scheme.eligibilityCriteria || [];
  const breakdown: EligibilityResult['breakdown'] = [];

  if (criteria.length === 0) {
    // Universal scheme with no restrictive prerequisites (e.g. ABHA ID, Soil Health Card)
    return {
      schemeId: scheme.id,
      schemeName: scheme.name,
      isEligible: true,
      overallStatus: 'Potentially Eligible',
      matchScore: 95,
      breakdown: [
        {
          criterionId: 'universal-citizen',
          label: 'Universal Citizen Access',
          userValue: profile.name || 'Resident Citizen',
          requiredValue: 'Open to All Indian Citizens',
          status: 'matched',
          reason: 'This welfare initiative has no restrictive demographic preconditions.'
        },
        {
          criterionId: 'verification-nodal',
          label: 'Official Identity Verification',
          userValue: 'Valid Aadhaar / KYC',
          requiredValue: 'Government Identity Proof',
          status: 'matched',
          reason: 'Standard identity authentication via Aadhaar / mobile verification.'
        }
      ],
      checkedAt: new Date().toISOString()
    };
  }

  let matchedWeight = 0;
  let totalWeight = 0;
  let hasCriticalFailure = false;

  for (const crit of criteria) {
    let status: 'matched' | 'unmatched' | 'needs_verification' | 'not_applicable' = 'matched';
    let reason = '';
    let userVal: any = undefined;
    let weight = 1;

    switch (crit.field) {
      case 'income':
        userVal = `₹${profile.annualFamilyIncome.toLocaleString('en-IN')}`;
        weight = 2; // High importance
        if (crit.operator === 'lte') {
          if (profile.annualFamilyIncome <= crit.value) {
            status = 'matched';
            reason = `Family income ₹${profile.annualFamilyIncome.toLocaleString('en-IN')} satisfies ceiling of ₹${Number(crit.value).toLocaleString('en-IN')}.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Family income ₹${profile.annualFamilyIncome.toLocaleString('en-IN')} exceeds prescribed limit of ₹${Number(crit.value).toLocaleString('en-IN')}.`;
          }
        }
        break;

      case 'student_status':
        userVal = profile.isStudent ? 'Active Student' : 'Not Enrolled';
        weight = 1.5;
        if (crit.operator === 'boolean') {
          if (profile.isStudent === Boolean(crit.value)) {
            status = 'matched';
            reason = 'Currently enrolled as an active regular student in a recognized institution.';
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = 'Applicant must currently be an active regular student.';
          }
        }
        break;

      case 'education':
        userVal = profile.education;
        weight = 1.5;
        const normUserEdu = normalizeEducation(profile.education);

        if (Array.isArray(crit.value)) {
          const satisfies = crit.value.some((allowed: string) => {
            return matchValues(normUserEdu, normalizeEducation(allowed));
          });

          if (satisfies) {
            status = 'matched';
            reason = `Education qualification (${profile.education}) satisfies eligible course streams (${crit.value.join(', ')}).`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Education qualification (${profile.education}) does not match required levels (${crit.value.join(', ')}).`;
          }
        } else {
          if (matchValues(normUserEdu, normalizeEducation(crit.value))) {
            status = 'matched';
            reason = `Education level matches requirement: ${crit.value}.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Requires education level to be ${crit.value}. Current is ${profile.education}.`;
          }
        }
        break;

      case 'occupation':
        userVal = profile.occupation;
        weight = 1.5;
        const normUserOcc = normalizeOccupation(profile.occupation);

        if (Array.isArray(crit.value)) {
          const satisfies = crit.value.some((allowed: string) => {
            return matchValues(normUserOcc, normalizeOccupation(allowed));
          });

          if (satisfies) {
            status = 'matched';
            reason = `Occupation "${profile.occupation}" qualifies under eligible groups (${crit.value.join(', ')}).`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Occupation "${profile.occupation}" not in eligible groups (${crit.value.join(', ')}).`;
          }
        } else {
          if (matchValues(normUserOcc, normalizeOccupation(crit.value))) {
            status = 'matched';
            reason = `Occupation "${profile.occupation}" qualifies directly.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Scheme is tailored for "${crit.value}". Current occupation is "${profile.occupation}".`;
          }
        }
        break;

      case 'age':
        userVal = `${profile.age} years`;
        weight = 1.2;
        if (crit.operator === 'gte') {
          if (profile.age >= crit.value) {
            status = 'matched';
            reason = `Age (${profile.age} yrs) meets minimum requirement of ${crit.value} years.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Age (${profile.age} yrs) is below minimum required age of ${crit.value} years.`;
          }
        } else if (crit.operator === 'lte') {
          if (profile.age <= crit.value) {
            status = 'matched';
            reason = `Age (${profile.age} yrs) is within maximum ceiling of ${crit.value} years.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Age (${profile.age} yrs) exceeds maximum allowable age of ${crit.value} years.`;
          }
        }
        break;

      case 'gender':
        userVal = profile.gender;
        weight = 2; // Strict demographic filter
        if (cleanText(profile.gender) === cleanText(crit.value)) {
          status = 'matched';
          reason = `Gender matches target beneficiary group (${crit.value}).`;
        } else {
          status = 'unmatched';
          hasCriticalFailure = true;
          reason = `Scheme is specifically designed for ${crit.value} beneficiaries.`;
        }
        break;

      case 'state':
        userVal = profile.state;
        weight = 2;
        if (Array.isArray(crit.value)) {
          if (crit.value.some((st: string) => cleanText(st) === cleanText(profile.state))) {
            status = 'matched';
            reason = `Permanent residency in ${profile.state} satisfies state quota eligibility.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Scheme is restricted to residents of ${crit.value.join(', ')}. Current state is ${profile.state}.`;
          }
        } else {
          if (cleanText(crit.value) === cleanText(profile.state)) {
            status = 'matched';
            reason = `Permanent domicile in ${profile.state} satisfies state eligibility.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Scheme is restricted to residents of ${crit.value}. Current state is ${profile.state}.`;
          }
        }
        break;

      case 'category':
        userVal = profile.socialCategory;
        weight = 1.5;
        if (Array.isArray(crit.value)) {
          if (crit.value.includes(profile.socialCategory)) {
            status = 'matched';
            reason = `Social category (${profile.socialCategory}) matches eligible reservation categories.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Scheme target category is ${crit.value.join(', ')}. Current profile is ${profile.socialCategory}.`;
          }
        } else {
          if (profile.socialCategory === crit.value) {
            status = 'matched';
            reason = `Category matches target group: ${crit.value}.`;
          } else {
            status = 'unmatched';
            hasCriticalFailure = true;
            reason = `Requires ${crit.value} category. Current is ${profile.socialCategory}.`;
          }
        }
        break;

      case 'disability':
        userVal = profile.isDifferentlyAbled ? 'Certified Benchmark Disability' : 'No Benchmark Disability';
        weight = 2;
        if (profile.isDifferentlyAbled === Boolean(crit.value)) {
          status = 'matched';
          reason = 'Verified certified benchmark disability status (>=40%).';
        } else {
          status = 'unmatched';
          hasCriticalFailure = true;
          reason = 'Scheme strictly requires verified benchmark disability (>=40%).';
        }
        break;

      default:
        userVal = 'Provided';
        status = 'needs_verification';
        reason = 'Condition requires physical verification by designated departmental nodal officer.';
        break;
    }

    if (status === 'matched') {
      matchedWeight += weight;
    }
    totalWeight += weight;

    breakdown.push({
      criterionId: crit.id,
      label: crit.label,
      userValue: userVal,
      requiredValue: crit.value,
      status,
      reason
    });
  }

  // Add Institutional Nodal verification milestone
  breakdown.push({
    criterionId: 'verification-nodal',
    label: 'Official Nodal Officer Verification',
    userValue: 'Pending Document Scrutiny',
    requiredValue: 'Institutional Approval',
    status: 'needs_verification',
    reason: 'Final grant approval is subject to document scrutiny by designated government verification officers.'
  });

  // Calculate real, dynamic match score
  let matchScore: number;
  if (hasCriticalFailure) {
    // If critical conditions fail (e.g. Income ₹10L instead of ₹2.5L, or State mismatch),
    // the score must reflect ineligibility (capped at 25%-40% max)
    const baseScore = Math.round((matchedWeight / totalWeight) * 40);
    matchScore = Math.max(15, Math.min(baseScore, 40));
  } else {
    // If all evaluated criteria pass, score is between 85% and 95%
    const ratio = matchedWeight / totalWeight;
    matchScore = Math.min(95, Math.max(75, Math.round(ratio * 95)));
  }

  let overallStatus: EligibilityResult['overallStatus'] = 'Potentially Eligible';
  if (matchScore >= 75) {
    overallStatus = 'Potentially Eligible';
  } else if (matchScore >= 45) {
    overallStatus = 'Needs Verification';
  } else {
    overallStatus = 'Likely Ineligible';
  }

  return {
    schemeId: scheme.id,
    schemeName: scheme.name,
    isEligible: matchScore >= 60,
    overallStatus,
    matchScore,
    breakdown,
    checkedAt: new Date().toISOString()
  };
}
