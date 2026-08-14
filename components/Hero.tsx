export default function Hero() {
  const stats = [
    {
      value: "100+",
      label: "Calculators",
    },
    {
      value: "99.9%",
      label: "Accuracy",
    },
    {
      value: "24/7",
      label: (
        <>
          <span className="font-semibold text-blue-600">Free</span>{" "}
          Access
        </>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-blue-50">

      {/* Background Grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(to_right,#e2e8f012_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f012_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">

        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            pt-10
            pb-10
            text-center
            md:pt-14
            md:pb-14
          "
        >

          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-white/80
              px-4
              py-1.5
              shadow-md
              backdrop-blur
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-blue-700
                sm:text-[10px]
              "
            >
              Trusted by Contractors & Builders
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-5
              max-w-xl
              text-[34px]
              font-black
              leading-[1.02]
              tracking-tight
              text-slate-900
              sm:text-5xl
              lg:max-w-4xl
              lg:text-7xl
            "
          >
            Smart{" "}

            <span
              className="
                bg-gradient-to-r
                from-blue-600
                via-sky-500
                to-cyan-500
                bg-clip-text
                text-transparent
              "
            >
              Construction
            </span>

            <br />

            Calculators
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-md
              text-base
              leading-7
              text-slate-600
              sm:max-w-xl
              sm:text-lg
            "
          >
            Fast, accurate construction calculators for concrete,
            brick, steel, paint, roofing and more.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex w-full max-w-md gap-3">

            <a
              href="#calculators"
              className="
                flex-1
                rounded-2xl
                bg-blue-600
                px-5
                py-4
                font-semibold
                text-white
                shadow-xl
                shadow-blue-200
                transition-all
                duration-300
                hover:bg-blue-700
              "
            >
              All Calculators
            </a>

            <a
              href="/categories"
              className="
                flex-1
                rounded-2xl
                border
                border-slate-300
                bg-white/90
                px-5
                py-4
                font-semibold
                text-slate-700
                backdrop-blur
                transition
                hover:bg-white
              "
            >
              Categories
            </a>

          </div>

          {/* Stats */}
          <div
            className="
              mt-10
              w-full
              max-w-4xl
              rounded-2xl
              border
              border-slate-200/80
              bg-white/80
              px-3
              py-6
              backdrop-blur-sm
              md:px-8
              md:py-7
            "
          >

            <div className="grid grid-cols-3">

              {stats.map((item, index) => (
                <div
                  key={item.value}
                  className={`
                    flex
                    min-h-[64px]
                    flex-col
                    items-center
                    justify-center
                    px-2
                    text-center

                    ${
                      index !== 0
                        ? "border-l border-slate-200"
                        : ""
                    }
                  `}
                >

                  {/* Number */}
                  <div
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                      text-slate-900
                      sm:text-3xl
                    "
                  >
                    {item.value}
                  </div>

                  {/* Label */}
                  <div
                    className="
                      mt-1
                      text-[10px]
                      font-medium
                      leading-4
                      text-slate-500
                      sm:text-xs
                      md:text-sm
                    "
                  >
                    {item.label}
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
