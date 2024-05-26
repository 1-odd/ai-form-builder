import React from "react";

const Hero = () => {

  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Create Your Forms
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                In Seconds Not In Hours{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-gray-600">
                Create your forms with our easy to use form builder. No coding
                required. Just ask our AI to genrate your form according to your requirements.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full  rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-900 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/dashboard"
              >
                Lets's Go   
              </a>

              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
