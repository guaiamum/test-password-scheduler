/**
 * Gets all paragraphs from given string.
 * @param {String} str - The div with message
 * @returns {Array<string>} - All paragraphs
 */
const getParagraphs = (str) => {
    return str.match(/<p>.*?<\/p>/g);
};

/**
 * Gets all content of the paragraphs.
 * @param {String} str - The div with message
 * @returns {Array<string>} - The content of paragraphs
 */
const getParagraphsContent = (str) => {
    return getParagraphs(str).map((e)=>e.replace(/<p>|<\/p>/g,''));
};

/**
 * Gets the Date from the paragraph or its content
 * @param {String|Array<string>} str - If a string, it assumes is the whole div, if not, only the paragraph content
 * @returns {Date}
 */
const getDate = (str) => {
    const contentArray = (typeof(str) === 'string' && getParagraphsContent(str)) || str;
    const dateArr = contentArray[1].substr(contentArray.length-12).split('-');
    
    return new Date(dateArr[2],dateArr[1] -1, dateArr[0]);
};

module.exports = { 
    getParagraphs,
    getParagraphsContent,
    getDate
}