import axios from "axios";
import { z } from "zod";

export const API = axios.create({
  baseURL: "https://calendarific.com/api/v2/",
});

const HolidayParser = z.object({
  name: z.string(),
  description: z.string(),
  country: z.object({
    id: z.string(),
    name: z.string(),
  }),
  date: z.object({
    iso: z.string(),
    datetime: z.object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
    }),
  }),
  type: z.string().array(),
  primary_type: z.string(),
  canonical_url: z.string(),
  locations: z.string(),
});

const HolidayArrayParser = HolidayParser.array();

export type THoliday = z.infer<typeof HolidayParser>;

export const getCountries = async () => {
  const res = await API.get(
    `/countries?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  return res.data.response.countries;
};

export const getCountryHolidays = async (country = "np") => {
  const currentYear = new Date().getFullYear();

  const res = await API.get(
    `/holidays?api_key=${process.env.NEXT_PUBLIC_API_KEY}&country=${country}&year=${currentYear}`
  );

  const holidays = HolidayArrayParser.parse(await res.data.response.holidays);

  return filterUpcoming7dayHoliday(holidays);
};

const filterUpcoming7dayHoliday = (data: THoliday[]) => {
  const [currentYear, currentMonth, currentDay] = [
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ];

  const currentTime = new Date(
    `${currentYear}-${currentMonth + 1}-${currentDay}`
  );

  const after7Days = new Date(currentTime.getTime() + 604800000);

  return data.filter((holiday) => {
    const eventDay = new Date(holiday.date.iso);
    if (currentTime <= eventDay && after7Days >= eventDay) {
      return true;
    }
  });
};
