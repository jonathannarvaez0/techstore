export const DisplayTextWithLineBreak = (text: string) => {
  let textArray = text.split(" ");

  let paragraph = textArray.map((element: string, index: number) => {
    if (element == "<br><br>") {
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

export const DisplayTextWithLineBreakForTextArea = (
  text: string | undefined
) => {
  let textArray = text?.split(" ");

  let paragraph = "";
  textArray?.map((element: string) => {
    if (element == "<br><br>") {
      paragraph += "\n";
    } else {
      paragraph += element;
    }
  });

  return paragraph;
};
