
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HomeLayout from "@/components/HomeLayout";
import HomeLogo from "@/components/HomeLogo";

const Home = () => {
  return (
    <HomeLayout>
      <HomeLogo />
      <h1 className="text-[#C2C2C2] font-mono">
        Connect with other students...
      </h1>
      <Search />
      <MenuLayout />
    </HomeLayout>
  );
};

export function Search() {
  return (
    <div className="flex items-center space-x-2 justify-center pt-5">
      <Input
        type="email"
        placeholder="Name, username, university & college..."
        className="text-white box_shadow"
      />
      <Button
        type="submit"
        className="box_shadow cursor-pointer bg-white hover:bg-slate-200 transition-colors delay-100 text-black"
      >
        Search
      </Button>
    </div>
  );
}

const MenuLayout = () => {
  return (
    <div className="box_shadow rounded-2xl bg-[#878296] w-[95%] h-[76%] m-auto mt-10">
      <div className="bg-red w-10 h-10"></div>
    </div>
  );
};

export default Home;
