const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const url =
  "https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020";
var cors = require("cors");

app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.use(cors());

axios
  .get(url)
  .then((response) => {
    let html = response.data;

    console.log(getPublicationDate(html));

    console.log(getBiddingDate(html));

    console.log(getObject(html));

    console.log(getAlllinks(html));
  })
  .catch((error) => {
    console.log(error);
  });

let getPublicationDate = (html) => {
  const $ = cheerio.load(html);
  txt = $(".lbl-licitacao:nth-child(1)").text();
  return txt;
};

let getBiddingDate = (html) => {
  const $ = cheerio.load(html);
  txt6 = $(".lbl-licitacao:nth-last-child(6)").text();
  return txt6;
};

let getObject = (html) => {
  const $ = cheerio.load(html);
  txt1 = $(".views-field span > .lbl-licitacao:nth-child(4)").text();
  txt2 = $(".views-field span > p:first-of-type").text();
  txt8 = txt1.concat(txt2);
  return txt8;
};

let getAlllinks = (html) => {
  const $ = cheerio.load(html);
  data = [];
  $(".block-content").each((i, elem) => {
    data.push({
      link: $(elem).find('a[href*="https://"]').attr("href"),
    });
  });

  return data;
};

app.get("/", function (req, res, next) {
  res.render("index", {
    data: { PublicationDate: txt, BiddingDate: txt6, Object: txt8, links: data },
  });
});
