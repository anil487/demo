import React from "react";
import { AiTwotoneQuestionCircle } from "react-icons/ai";

const Page = () => {
  let Questionbanks = [
    {
      question: "Can you really make money with ShareSale?",
      answer:
        "Yes, you can earn significant money by promoting relevant affiliate products on ShareSale",
    },
    {
      question: "Is ShareSale better than Clickbank?",
      answer:
        "it depends upon your niche.ShareSales offers flexible comission rates and massive database of physical products,while Clickbank offers a wide range of digital products ",
    },
    {
      question: "How much does it cost to join ShareSales as an affilate?",
      answer:
        "you'll need to pay a one-time network access fee of $550 and a $100 deposit.",
    },
  ];

  return (
    <div className="flex justify-center">
    <section className="container max-w-screen-md xl:max-w-screen-lg my-8 md:mx-5 lg:mx-7 xl:mx-9">
      <div className="my-3 mx-6">
        <h1 className="font-bold text-[24px] mt-8">FAQs</h1>
      </div>
      <div className="flex flex-col gap-5">
      {Questionbanks.map((item, index) => (
        <div
          key={index}
          className="flex flex-col bg-white shadow-lg p-6 rounded-md"
        >
          <div className="flex justify-between items-center w-full">
            <span className="font-bold text-[24px] w-full">
              {item.question}
            </span>
            <span>
              <AiTwotoneQuestionCircle className="text-2xl ml-3 " />
            </span>
          </div>
          <hr className="w-full h-1 mx-auto my-1 bg-black border-0 rounded md:my-2 dark:bg-gray-700"></hr>

          <span className="text-[22px] my-3">{item.answer}</span>
        </div>
      ))}
      </div>
    </section>
    </div>
  );
};

export default Page;
