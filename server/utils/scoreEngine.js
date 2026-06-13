export function calcProfileStrength(user) {
  const checks = [
    { v: user.fullName,               w: 10 },
    { v: user.phone,                  w: 5  },
    { v: user.location,               w: 5  },
    { v: user.resumeHeadline,         w: 10 },
    { v: user.resumeUrl,              w: 15 },
    { v: user.skills?.length,         w: 15 },
    { v: user.education?.length,      w: 10 },
    { v: user.experience?.length,     w: 10 },
    { v: user.projects?.length,       w: 10 },
    { v: user.certifications?.length, w: 5  },
    { v: user.githubUrl,              w: 5  },
  ];
  return checks.reduce((sum, c) => sum + (c.v ? c.w : 0), 0);
}

export function calcCareerReadiness(user) {
  let score = 0;
  const recs = [];

  if (user.skills?.length >= 5) score += 20;
  else recs.push(`Add ${5 - (user.skills?.length || 0)} more skills`);

  if (user.projects?.length >= 2) score += 20;
  else recs.push(`Add ${2 - (user.projects?.length || 0)} project(s)`);

  if (user.resumeUrl) score += 20;
  else recs.push('Upload your resume');

  if (user.certifications?.length >= 1) score += 15;
  else recs.push('Add at least one certification');

  if (user.education?.length >= 1) score += 15;
  else recs.push('Add your education details');

  if (user.githubUrl) score += 10;
  else recs.push('Add your GitHub profile');

  return { score, recs };
}

export function calcResumeScore(user) {
  let score = 0;
  const suggestions = [];

  if (user.resumeUrl) score += 20;
  else suggestions.push('Upload a PDF resume');

  if (user.resumeHeadline?.length > 20) score += 10;
  else suggestions.push('Write a stronger resume headline (20+ chars)');

  if (user.skills?.length >= 5) score += 20;
  else suggestions.push('Add more technical skills');

  if (user.projects?.length >= 2) score += 20;
  else suggestions.push('Add 2+ projects with tech stack details');

  if (user.certifications?.length) score += 10;
  else suggestions.push('Add certifications');

  if (user.githubUrl) score += 10;
  else suggestions.push('Add your GitHub URL');

  if (user.linkedinUrl) score += 10;
  else suggestions.push('Add your LinkedIn URL');

  return { score, suggestions };
}