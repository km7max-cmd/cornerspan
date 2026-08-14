export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">

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

      {/* Soft Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-blue-400/20
          blur-3xl
        "
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto flex max-w-5xl flex-col items-center pt-6 pb-10 text-center md:pt-10 md:pb-14">

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
                px-6
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
              Explore
            </a>

            <a
              href="/categories"
              className="
                flex-1
                rounded-2xl
                border
                border-slate-300
                bg-white/90
                px-6
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

          {/* Search */}
          <div className="mt-6 w-full max-w-md">

            <div className="relative">

              <input
  id="calculator-search"
  type="text"
                placeholder="Search calculators..."
                className="
                  h-12
                  w-full
                  rounded-full
                  border
                  border-slate-200
                  bg-white/90
                  pl-11
                  pr-14
                  text-sm
                  shadow-md
                  outline-none
                  backdrop-blur
                  placeholder:text-slate-400
                  focus:border-blue-500
                "
              />

              <span
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  text-slate-400
                "
              >
                🔍
              </span>

              <button
                type="button"
                className="
                  absolute
                  right-1.5
                  top-1/2
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  text-sm
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                "
              >
                →
              </button>

            </div>

          </div>

          {/* Statistics */}
          <div
            className="
              mt-8
              w-full
              max-w-4xl
              rounded-3xl
              border
              border-slate-200
              bg-white/90
              p-5
              shadow-xl
              backdrop-blur
            "
          >

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600">
                  100+
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  Calculators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600">
                  99.9%
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  Accuracy
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600">
                  24/7
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  Free Access
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600">
                  1M+
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  Calculations
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
