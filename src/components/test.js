import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const TickTable = () => {
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
            fromNow: date(fromNow: true)
            url
          }
        }
      }
    }
  `);
  return (
    //<pre>{JSON.stringify(data.allTickJsonJson.edges, null, 4)}</pre>
    <div className="flex justify-center">
      <table className="table-fixed w-full">
        <thead className="text-left">
          <tr>
            <th className="w-4/12 px-4 pt-2">Name</th>
            <th className="w-2/12 px-4 pt-2">Rating</th>
            <th className="w-2/12 px-4 pt-2">Style</th>
            <th className="w-2/12 px-4 pt-2">Ascent Style</th>
            <th className="w-2/12 px-4 pt-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.allTickJsonJson.edges.map(ticks => (
            <tr key={ticks.node.name} className="border-t hover:bg-gray-200">
              <td className="px-4 py-2">
                <a href={ticks.node.url}>{ticks.node.name}</a>
              </td>
              <td className="px-4 py-2">{ticks.node.rating}</td>
              <td className="px-4 py-2">
                {ticks.node.type.length > 5
                  ? ticks.node.type.slice(0, -4)
                  : ticks.node.type}
              </td>
              <td className="px-4 py-2">{ticks.node.leadStyle}</td>
              <td className="px-4 py-2">{ticks.node.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TickTable;
