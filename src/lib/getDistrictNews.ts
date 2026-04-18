import coimbatore from "@/data/news/coimbatore.json";
import dharmapuri from "@/data/news/dharmapuri.json";
import erode from "@/data/news/erode.json";
import karur from "@/data/news/karur.json";
import namakkal from "@/data/news/namakkal.json";
import nilgiris from "@/data/news/nilgiris.json";
import salem from "@/data/news/salem.json";
import tiruppur from "@/data/news/tiruppur.json";

import type { DistrictNewsItem } from "@/data/districtNews";

const newsByDistrict: Record<string, DistrictNewsItem[]> = {
  coimbatore: coimbatore as DistrictNewsItem[],
  dharmapuri: dharmapuri as DistrictNewsItem[],
  erode: erode as DistrictNewsItem[],
  karur: karur as DistrictNewsItem[],
  namakkal: namakkal as DistrictNewsItem[],
  nilgiris: nilgiris as DistrictNewsItem[],
  salem: salem as DistrictNewsItem[],
  tiruppur: tiruppur as DistrictNewsItem[],
};

export const getDistrictNews = (district: string): DistrictNewsItem[] =>
  newsByDistrict[district] ?? [];
