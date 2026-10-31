
import OrbitingCircles from "./OrbitingCircle";

export default function AppIntro() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-orbit-violet p-10 text-white">

      {/* Logo */}
      <div className="z-10 flex items-center gap-3 text-3xl font-bold">
        <span>Orbit</span>
      </div>

      {/* Orbits */}
    

         <div className="absolute inset-0 flex items-center justify-center">

        {/* Orbit كبير */}
        <OrbitingCircles
          radius={180}
          duration={25}
          path={false}
        >
          <div className="h-3 w-3 rounded-full bg-orbit-coral" />
          <div className="h-3 w-3 rounded-full bg-orbit-mint" />
          <div className="h-3 w-3 rounded-full bg-orbit-coral" />
          <div className="h-3 w-3 rounded-full bg-orbit-mint" />
          <div className="h-3 w-3 rounded-full bg-orbit-coral" />
          <div className="h-3 w-3 rounded-full bg-orbit-mint" />
        </OrbitingCircles>

        {/* Orbit صغير */}
        <OrbitingCircles
          radius={100}
          duration={18}
          reverse
          path={false}
        >
          <div className="h-2 w-2 rounded-full bg-orbit-mint" />
          <div className="h-2 w-2 rounded-full bg-orbit-coral" />
          <div className="h-2 w-2 rounded-full bg-orbit-mint" />
          <div className="h-2 w-2 rounded-full bg-orbit-coral" />

        </OrbitingCircles>

        <div className="absolute h-[84px] w-[84px] rounded-full bg-white" />

      </div>

      {/* Text */}
      <p className="z-10 max-w-[14em] text-4xl font-bold leading-snug">
        Keep your people close.

        <small className="mt-2 block text-base font-normal">
          Share moments with friends, all in one place.
        </small>
      </p>

    </div>
  );
}