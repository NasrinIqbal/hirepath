export function calcJobMatch(user, job) {
  const userSkills = (user.skills || []).map(s => s.toLowerCase());
  const jobSkills  = (job.requiredSkills || []).map(s => s.toLowerCase());

  const matched = jobSkills.filter(s => userSkills.includes(s));
  const missing = jobSkills.filter(s => !userSkills.includes(s));

  const skillScore = jobSkills.length
    ? (matched.length / jobSkills.length) * 70
    : 70;

  const eduBonus = job.requiredEducation && user.education?.length ? 15 : 0;
  const expBonus = user.experience?.length >= 1 ? 15 : 0;

  const total = Math.min(100, Math.round(skillScore + eduBonus + expBonus));

  return { total, matched, missing };
}

export function getRecommendedJobs(user, jobs) {
  return jobs
    .map(job => ({ job, match: calcJobMatch(user, job).total }))
    .filter(j => j.match >= 40)
    .sort((a, b) => b.match - a.match)
    .slice(0, 10)
    .map(j => ({ ...j.job._doc, matchScore: j.match }));
}