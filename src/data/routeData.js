//import React from "react"
import { useStaticQuery, graphql } from "gatsby";

const RouteData = () => {
  const data = useStaticQuery(graphql`
    {
      allTickJsonJson(filter: { style: { eq: "Lead" } }) {
        edges {
          node {
            name
            rating
            type
            leadStyle
            dateYear: date(formatString: "YYYY")
            dateMonth: date(formatString: "MM")
            date(formatString: "DD MMM YYYY")
            url
          }
        }
      }
    }
  `);

  const simpleRating = {
    "5.6": "5.6",
    "5.7": "5.7",
    "5.8-": "5.8",
    "5.8": "5.8",
    "5.8 R": "5.8",
    "5.8+": "5.8",
    "5.8+ R": "5.8",
    "5.9-": "5.9",
    "5.9": "5.9",
    "5.9 R": "5.9",
    "5.9+": "5.9",
    "5.10-": "5.10a",
    "5.10": "5.10b",
    "5.10a": "5.10a",
    "5.10a/b": "5.10b",
    "5.10b": "5.10b",
    "5.10b PG13": "5.10b",
    "5.10b R": "5.10b",
    "5.10c": "5.10c",
    "5.10b/c": "5.10c",
    "5.10+": "5.10d",
    "5.10d": "5.10d",
    // "5.11a": "5.11a",
    // "5.11b": "5.11b",
    // "5.11c": "5.11c",
    // "5.11d": "5.11d",
    // "5.12a": "5.12a",
    // V1: "V1",
    // "V1+": "V1",
    // "V1+ PG13": "V1",
    // V2: "V2",
    // "V2+": "V2",
    // V3: "V3",
    // "V3+": "V3",
    // V4: "V4",
    // "V4+": "V4",
    // V5: "V5",
    // "V5+": "V5",
    // V6: "V6",
    // "V6+": "V6",
    // V7: "V7",
    // "V7+": "V7"
  };

  const makeTickRatings = (style = null) => {
    let tickRatings = [];
    Object.keys(simpleRating).forEach((rating) => {
      data.allTickJsonJson.edges.forEach((tick) => {
        if (style === "trad") {
          if (
            tick.node.type.slice(0, 4) === "Trad" &&
            tick.node.rating === rating
          ) {
            tickRatings.push(simpleRating[tick.node.rating]);
          }
        } else if (style === "sport") {
          if (
            tick.node.type.slice(0, 5) === "Sport" &&
            tick.node.rating === rating
          ) {
            tickRatings.push(simpleRating[tick.node.rating]);
          }
        } else {
          if (tick.node.rating === rating) {
            tickRatings.push(simpleRating[tick.node.rating]);
          }
        }
      });
    });
    return tickRatings;
  };

  const makeFreqTable = (tickRatings) => {
    const ratingRange = ratingOrder.slice(easyIndex, hardIndex + 1);
    let ratingFreq = {};
    ratingRange.forEach((rating) => {
      ratingFreq[rating] = 0;
    });
    tickRatings.forEach((rating) => {
      ratingFreq[rating] ? ratingFreq[rating]++ : (ratingFreq[rating] = 1);
    });
    return ratingFreq;
  };

  const allRatings = makeTickRatings();

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const ratingOrder = Object.values(simpleRating).filter(unique);
  const easy = ratingOrder.filter((rating) => rating === allRatings[0])[0];
  const hard = ratingOrder.filter(
    (rating) => rating === allRatings[allRatings.length - 1]
  )[0];
  const easyIndex = ratingOrder.findIndex((rating) => rating === easy);
  const hardIndex = ratingOrder.findIndex((rating) => rating === hard);
  const freqTable = makeFreqTable(allRatings);

  const makeTradData = () => {
    const tradRatings = makeTickRatings("trad");
    const tradTable = makeFreqTable(tradRatings);
    return tradTable;
  };

  const makeSportData = () => {
    const sportRatings = makeTickRatings("sport");
    const sportTable = makeFreqTable(sportRatings);
    return sportTable;
  };

  const makeChartData = (freqTable) => {
    const allEntries = Object.entries(freqTable);
    const tradEntries = Object.entries(makeTradData());
    const sportEntries = Object.entries(makeSportData());
    let data = {
      labels: [],
      trad: { ratings: [], counts: [] },
      sport: { ratings: [], counts: [] },
    };
    for (const [rating] of allEntries) {
      data.labels.push(rating);
    }
    for (const [ratings, counts] of tradEntries) {
      data.trad.ratings.push(ratings);
      data.trad.counts.push(counts);
    }
    for (const [ratings, counts] of sportEntries) {
      data.sport.ratings.push(ratings);
      data.sport.counts.push(counts);
    }
    return data;
  };

  const chartData = makeChartData(freqTable);

  return chartData;
};

export default RouteData;
