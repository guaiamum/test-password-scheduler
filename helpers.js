const getParagraphs = (str) => {
    return str.match(/<p>.*?<\/p>/g);
};
const getParagraphsContent = (str) => {
    return getParagraphs(str).map((e)=>e.replace(/<p>|<\/p>/g,''));
};
const getDate = (str) => {
    const contentArray = getParagraphsContent(str);
    return contentArray[1].substr(contentArray.length-12);
};

module.exports = { 
    getParagraphs,
    getParagraphsContent,
    getDate
}