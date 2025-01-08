import React from 'react';
import { TbSquareRoundedArrowRight } from "react-icons/tb";

const Tips = () => {
  const source = [
    { besttips: "Choose a profitable niche"

     },
    { besttips: "Buy a domain and hosting" 

    },
    { besttips: "Choose a blog theme" 

    },
    { besttips: "Generate blog content" 
        
    },
  ];

  return (
    <section className='mx-6'>
    <div className='mt-4'>
    <div>
      <span className="font-normal text-[24px] mt-4">
        Here are some of the best tips to promote your products;
      </span>
      </div>
      <ul className="text-[20px]">
      
        {source.map((item, index) => (
          <li key={index} className="mt-4 flex items-center">
            <TbSquareRoundedArrowRight />
            {item.besttips}
          </li>
          
        ))}
      </ul>
    </div>
    </section>
  );
};

export default Tips;
