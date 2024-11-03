import { getCountries, getCountryHolidays, THoliday } from "@/api/services";
import Card from "@/components/Card";
import { Header } from "@/components/Header";
import Search from "@/components/Search";
import { useEffect, useState } from "react";

export default function Home() {
  const [holidays, setHolidays] = useState<THoliday[]>();
  const [countries, setCountries] = useState<any[]>();
  const [currentCountry, setCurrentCountry] = useState("Nepal");
  const [messageText, setMessageText] = useState<string>();

  useEffect(() => {
    getCountries().then((r) => setCountries(r));
  }, []);

  const error = messageText == "" ? false : true;

  useEffect(() => {
    if (countries == undefined) return;

    const symbol = countries?.find(
      (country) => country["country_name"] === currentCountry
    );

    if (symbol === undefined) {
      setMessageText("Invalid Country");
      return;
    }
    setMessageText("");

    getCountryHolidays(symbol["iso-3166"]).then((r) => {
      if (r.length == 0) setMessageText("No holidays in upcoming 7 days");
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

        {!error &&
          holidays?.map((holiday) => (
            <Card key={holiday.name} holiday={holiday} />
          ))}

        {error && (
          <p className="text-white bg-red-400/20 backdrop-blur-lg px-6 py-4 rounded text-xl">
            {messageText}
          </p>
        )}
      </div>
    </>
  );
}
