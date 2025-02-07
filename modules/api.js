async function fetchData() {
  try {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const type = document.getElementById("type").value;

    const http = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=${type}&category=${category}`;
    const res = await fetch(http);

    if (!res.ok) {
      throw new Error("HTTP error!");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export { fetchData };
