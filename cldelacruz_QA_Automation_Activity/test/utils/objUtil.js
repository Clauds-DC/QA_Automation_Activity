import file from './file';
import reporter from './reporter';
import fs from 'fs';


class ObjUtil {

    async clickObject(selector) {
        const element = await browser.$(selector);
        await element.waitForDisplayed();
        await element.waitForEnabled();
        await element.click();
    }    
    
    /**
     * @function clickObject | @author cldelacruz
     * @description Click an object element | @date 2024-10-23
     * @param {Object} objElement - The object element to be clicked
     */
    async clickObject(objElement) {
        await reporter.addLog('Started Function: clickObject');
        await objElement.waitForExist({ timeout: 10000 });
        await objElement.click();

        const strXpath = await objElement.selector;
        await file.appendTxtFile(global.strPath, `Completed Function: clickObject - Successfully clicked ${strXpath}`);
    }

    /**
     * @function setObjectValue | @author cldelacruz
     * @description Set value in an input object element | @date 2024-10-23
     * @param {Object} objElement - The object element to set the value
     * @param {string} strText - The value to be set
     */
    async setObjectValue(objElement, strText) {
        await reporter.addLog('Started Function: setObjectValue');
        await objElement.waitForExist();
        await objElement.setValue(strText);

        const strXpath = await objElement.selector;
        await file.appendTxtFile(global.strPath, `Completed Function: setObjectValue - Successfully set value for ${strXpath}`);
    }

    /**
     * @function getObjText | @author cldelacruz
     * @description Get the text of an object element | @date 2024-10-23
     * @param {Object} objElement - The object element to retrieve the text from
     * @returns {string} - The text of the object element
     */
    async getObjText(objElement) {
        await reporter.addLog('Started Function: getObjText');
        await objElement.waitForExist();
        
        const strXpath = await objElement.selector;
        const strText = await objElement.getText();
        
        await file.appendTxtFile(global.strPath, `Completed Function: getObjText - Object ${strXpath} Text [${strText}]`);
        return strText;
    }

    /**
     * @function getObjValue | @author cldelacruz
     * @description Get the value of an object element | @date 2024-10-23
     * @param {Object} objElement - The object element to retrieve the value from
     * @returns {string} - The value of the object element
     */
    async getObjValue(objElement) {
        await reporter.addLog('Started Function: getObjValue');
        await objElement.waitForExist();
        
        const strXpath = await objElement.selector;
        const strValue = await objElement.getValue();
        
        await file.appendTxtFile(global.strPath, `Completed Function: getObjValue - Object ${strXpath} Value [${strValue}]`);
        return strValue;
    }

    async appendTxtFile(filePath, data) {
        try {
            fs.appendFileSync(filePath, data + '\n');
            reporter.addLog(`Data appended to file: ${filePath}`);
        } catch (error) {
            reporter.addLog(`Error appending data to file: ${error}`);
        }
    }
}

export default new ObjUtil();
