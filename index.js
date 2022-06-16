require("dotenv").config();
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

exports.getDatabase = async function () {
  const response = await notion.databases.query({ database_id: databaseId });

  const responseResults = response.results.map((page) => {
    console.log(page.properties.Image.files[0]?.name)
    return {
      id: page.id,
      name: page.properties.Name.title[0]?.plain_text,
      jour: page.properties.Jour.rich_text[0]?.plain_text,
      image: page.properties.Image.files[0]?.name,
    };
  });
  return responseResults;
};

exports.newEntryToDatabase = async function (name,jour) {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_API_DATABASE,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Jour: {
        rich_text: [
          {
            text: {
              content: jour,
            },
          },
        ],
      },
      Image: {
        files: [
          {
            text: {
              content: image,
            },
          },
        ],
      },
    },
  });

  return response;
};
