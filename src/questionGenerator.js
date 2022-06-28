async function generate() {
  let url = "";
  if (sessionStorage.generated === undefined) {
    let cats = [];
    let i = 0;
    while (i < 5) {
      url =
        "https://jservice.io/api/categories?offset=" +
        Math.ceil(Math.random() * 100);
      //sessionStorage.generated = "true";
      const response = await fetch(url);
      const json = await response.json();
      if (json[0].clues_count >= 5) {
        cats[i] = json[0].id;
        i++;
      }
    }
    let questions = [];
    let values = [200, 400, 600, 800, 1000];
    let qURL = "https://jservice.io/api/clues?category=";
    for (let i = 0; i < 5; i++) {
      let qURLL = qURL + cats[i];
      const response = await fetch(qURLL);
      const json = await response.json();
      questions[i] = [];
      for (let j = 0; j < 5; j++) {
        questions[i][j] = json[j];
      }
      questions[i].sort(function (a, b) {
        return a.value - b.value;
      });
      for (let j = 0; j < 5; j++) {
        questions[i][j].value = values[j];
      }
    }
    let dictArr = [];
    let counter = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (counter % 6 == 0) {
          dictArr.push({
            id: counter,
            question: "CATEGORY",
            answer: "undefined",
            played: false,
            price: "undefined",
            category: questions[i][j]["category"]["title"],
          });
          counter++;
        }
        dictArr.push({
          id: counter,
          question: questions[i][j]["question"],
          answer: questions[i][j]["answer"],
          played: false,
          price: questions[i][j]["value"],
          category: questions[i][j]["category"]["title"],
        });
        counter++;
      }
    }
    window.sessionStorage.setItem(
      "state",
      JSON.stringify({ questions: dictArr })
    );
    console.log("TestTESt");
    console.log(JSON.stringify({ questions: dictArr }));
    sessionStorage.generated = "true";
  }
}

export default generate;
