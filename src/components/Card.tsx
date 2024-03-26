interface CardProps {
  element: {
    productName: string;
    price: string;
    categoryName: string;
    location: string;
  };

  index: number;
  setIsProductFullDetailsVisible: (condition: boolean) => void;
  setSelectedProduct: (element: any) => void;
}

function Card(props: CardProps) {
  return (
    <div
      key={props.index}
      className={`${props.index % 2 == 0 ? "bg-gray-200" : ""} p-2`}
    >
      <h1
        className="text-accent font-bold hover:underline decoration-solid hover:cursor-pointer inline"
        onClick={() => {
          props.setSelectedProduct(props.element);
          props.setIsProductFullDetailsVisible(true);
        }}
      >
        {props.element.productName}
      </h1>
      <div>
        <span className="font-bold">PHP {props.element.price}</span> -{" "}
        <span className="text-accent font-semibold">
          {props.element.categoryName}
        </span>{" "}
        <span>({props.element.location})</span>
      </div>
    </div>
  );
}

export default Card;
