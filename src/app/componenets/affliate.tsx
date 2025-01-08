import React from "react";
import { Itim } from "next/font/google";
import Image from "next/image";

const itim = Itim({ weight: "400", subsets: ["latin"] });

const Affiliate = () => {
  return (
    <section className="grid gap-2 container max-w-screen-lg mx-auto">
      <div className="grid grid-cols-2 items-center gap-1 h-96">
        <div className="  relative w-full md:relative  ">
          <span
            className={`${itim.className} font-normal text-[400px] text-[#8284CC1A]`}
          >
            1
          </span>
          <div className="absolute flex flex-col top-60 left-24 gap-4">
            <span className=" text-lg md:text-5xl font-medium text-[#25265E]">
              Get your Affiliate Link
            </span>
            <span className="text-[16px] font-normal text-[#25265E]">
              Sign up on our website to receive your personalized affiliate
              link.
            </span>
          </div>
        </div>
        <div className="justify-end hidden md:flex md:visible">
          <Image
            src={"/group.png"}
            alt="group-image"
            width={375}
            height={271}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-1 h-96">
        <div className="justify-start hidden md:flex md:visible">
          <Image
            src={"/group.png"}
            alt="group-image"
            width={362}
            height={319}
          />
        </div>
        <div className="relative w-full md:relative">
          <div>
          <span
            className={`${itim.className} font-normal text-[400px] text-[#8284CC1A]`}
          >
            2
          </span>
          <div className="absolute flex flex-col top-60 left-24 gap-4">
            <span className=" text-lg md:text-5xl font-medium text-[#25265E]">
              Share with your Audience
            </span>
            <span className="text-[16px] font-normal text-[#25265E]">
              Promote your link across social media, blogs, or with friends.
            </span>
          </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-1 h-96">
        <div className=" relative w-full md:relative">
          <span
            className={`${itim.className} font-normal text-[400px] text-[#8284CC1A]`}
          >
            3
          </span>
          <div className="absolute flex flex-col top-60 left-24 gap-4">
            <span className="text-lg md:text-5xl font-medium text-[#25265E]">
              Enjoy your Commission
            </span>
            <span className="text-[16px] font-normal text-[#25265E]">
              Earn a commission for every successful referral made through your
              link.
            </span>
          </div>
        </div>
        <div className=" justify-end hidden md:flex md:visible">
          <Image
            src={"/amico.png"}
            alt="amico-image"
            width={320}
            height={271}
          />
        </div>
      </div>
    </section>
  );
};

export default Affiliate;
