document.getElementById("test").onclick = async () => {
  const res = await fetch("/api/secret-test");
  const data = await res.json();
  console.log("Frontend received:", data);
};