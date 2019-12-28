module.exports = async () => {
  const resp = await fetch("/auth/checkStat");
  const data = await resp.json();
  return data;
};
