import { getCountries, getCountryHolidays, THoliday } from "@/api/services";
import Card from "@/components/Card";
import { Header } from "@/components/Header";
import Search from "@/components/Search";
import { useEffect, useState } from "react";

export default function Home() {
  const [holidays, setHolidays] = useState<THoliday[]>();
  const [countries, setCountries] = useState<any[]>();
  const [currentCountry, setCurrentCountry] = useState("Nepal");

  useEffect(() => {
    getCountries().then((r) => setCountries(r));
  }, []);

  useEffect(() => {
    if (countries == undefined) return;

    const symbol = countries?.find(
      (country) => country["country_name"] === currentCountry
    );

    getCountryHolidays(symbol["iso-3166"]).then((r) => {
      setHolidays(r);
    });
  }, [countries, currentCountry]);

  return (
    <>
      <Header />
      <div className="px-6 py-4 flex flex-col gap-2">
        <Search countries={countries} setCurrentCountry={setCurrentCountry} />

        <h2 className="text-white font-bold text-2xl">
          Upcoming Holidays in 7 Days in {currentCountry}
        </h2>

        {holidays?.map((holiday) => (
          <Card key={holiday.name} holiday={holiday} />
        ))}
      </div>
    </>
  );
}
