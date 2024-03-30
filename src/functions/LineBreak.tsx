export const DisplayTextWithLineBrak = (text: string) => {
  let textArray = text.split(" ");

  let paragraph = textArray.map((element: string, index: number) => {
    if (element == "<br><br>") {
      console.log("hehe");
      return <br key={index}></br>;
    } else {
      return <span key={index}>{element} </span>;
    }
  });

  return <p>{paragraph}</p>;
};

export const AppendLineBreak = (text: string) => {
  return text.replace(/\n/g, " <br><br> ");
};
