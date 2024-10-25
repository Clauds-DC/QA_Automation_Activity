import pgThinkingTester from '../pageObj/pgThinkingTester.js';
import objUtil from '../utils/objUtil.js';
import reporter from '../utils/reporter.js';
import moment from 'moment';
import File from '../utils/file.js'


let generatedEmail = 'test_20241024_1648175@test.com';

describe('Heroku Application', () => {
    it.skip('Heroku App SignUp_TC001', async () => {
        
        await reporter.addLog('Navigate to the website')
        await pgThinkingTester.navigate();

        await reporter.addLog('Click the Sign Up button')
        await objUtil.clickObject(pgThinkingTester.signUpBtn);

        await reporter.addLog()
        await objUtil.setObjectValue(pgThinkingTester.firstNameInput, 'Clauds');
        await objUtil.setObjectValue(pgThinkingTester.lastNameInput, 'Dela Cruz');

        await reporter.addLog('Generate dynamic email using the current timestamp and include the seat number (5)')
        const currentDateTime = moment(new Date()).format('YYYYMMDD_HHmmss')
        const specialNumber = 5;
        generatedEmail = `test_${currentDateTime}${specialNumber}@test.com`;
        console.log(generatedEmail)
        await objUtil.setObjectValue(pgThinkingTester.emailInput, generatedEmail);

        await reporter.addLog('Set password')
        await objUtil.setObjectValue(pgThinkingTester.passwordInput, 'testing');

        await reporter.addLog('Submit the form')
        await objUtil.clickObject(pgThinkingTester.submitBtn);
        await browser.pause(5000);

    }); 

    it('Heroku App Login User_TC002', async () => {
        await reporter.addLog('Navigate to the website');
        await pgThinkingTester.navigate();
    
        await reporter.addLog('Fill email field');
        await objUtil.setObjectValue(pgThinkingTester.loginEmail, generatedEmail);
    
        await reporter.addLog('Fill password field');
        const loginPass = 'testing';
        await objUtil.setObjectValue(pgThinkingTester.loginPassword, loginPass);
    
        await reporter.addLog('Submit the login form');
        await objUtil.clickObject(pgThinkingTester.loginBtn);
        await browser.pause(5000);

    });

    it('Heroku App Add Contact TC003', async () => {
        await reporter.addLog('Navigate to the website');
        await pgThinkingTester.navigate();
    
        await reporter.addLog('Fill email field');
        await objUtil.setObjectValue(pgThinkingTester.loginEmail, generatedEmail);
    
        await reporter.addLog('Fill password field');
        const password = 'testing';
        await objUtil.setObjectValue(pgThinkingTester.loginPassword, password);
    
        await reporter.addLog('Submit the login form');
        await objUtil.clickObject(pgThinkingTester.submitBtn);
    
        await reporter.addLog('Wait for the Add Contact button to appear');
        await $('//button[@id="add-contact"]').waitForExist({ timeout: 20000 });
    
        const table = await $('table');
        const rows = await table.$$('tr');
        let userCount = await rows.length;
    
        while (userCount < 4) {
            await reporter.addLog(`Adding contact ${userCount + 1}`);
    
            await objUtil.clickObject(pgThinkingTester.addContactBtn);
            await pgThinkingTester.firstNameEdit.waitForExist();
    
            await reporter.addLog('Fill in the contact details');
            await objUtil.setObjectValue(pgThinkingTester.firstNameEdit, `test${userCount}`);
            await objUtil.setObjectValue(pgThinkingTester.lastNameEdit, `test${userCount}`);
            await objUtil.setObjectValue(pgThinkingTester.birthdayEdit, await pgThinkingTester.generateBirth());
            await objUtil.setObjectValue(pgThinkingTester.emailEdit, `test${userCount}@test.com`);
            await objUtil.setObjectValue(pgThinkingTester.phoneEdit, `09123456789${userCount}`);
            await objUtil.setObjectValue(pgThinkingTester.street1Edit, `street${userCount}`);
            await objUtil.setObjectValue(pgThinkingTester.street2Edit, `street${userCount}`);
            await objUtil.setObjectValue(pgThinkingTester.cityEdit, `test${userCount} City`);
            await objUtil.setObjectValue(pgThinkingTester.stateProvinceEdit, `test${userCount} Province`);
            await objUtil.setObjectValue(pgThinkingTester.postalCodeEdit, `300${userCount}`);
            await objUtil.setObjectValue(pgThinkingTester.countryEdit, 'Philippines');
    
            await reporter.addLog('Submit the contact form');
            await objUtil.clickObject(pgThinkingTester.submitBtn);
    
            await browser.pause(1000);
    
            const newTable = await $('table');
            const newRows = await newTable.$$('tr');
            userCount = await newRows.length;
        }
    });

    it('Heroku App Edit Contact TC004', async () => {

        await reporter.addLog('Navigate to the website');
        await pgThinkingTester.navigate();

        await reporter.addLog('Fill email field');
        await objUtil.setObjectValue(pgThinkingTester.loginEmail, generatedEmail);
    
        await reporter.addLog('Fill password field');
        const password = 'testing';
        await objUtil.setObjectValue(pgThinkingTester.loginPassword, password);

        await reporter.addLog('Submit the login form');
        await objUtil.clickObject(pgThinkingTester.loginBtn);
        await browser.pause(5000);

        await reporter.addLog('Wait for the first contact to be displayed');
        await $('//table//tr[1]//td[2]').waitForExist({ timeout: 20000 });

        await reporter.addLog('Click the first contact in the table');
        await objUtil.clickObject($('//table//tr[1]//td[2]'));

        await reporter.addLog('Click the Edit Contact button');
        await pgThinkingTester.editContactBtn.waitForExist({ timeout: 10000 });
        await objUtil.clickObject(pgThinkingTester.editContactBtn);

        const strDateTime = moment(new Date()).format('YYYYMMDD');
        await reporter.addLog(`Generate and update postal code: ${strDateTime}`);

        await reporter.addLog('Clear the existing postal code');
        await pgThinkingTester.postalCodeEdit.clearValue();

        await browser.pause(1000);

        await reporter.addLog('Set the new postal code');
        await objUtil.setObjectValue(pgThinkingTester.postalCodeEdit, strDateTime);

        await reporter.addLog('Submit the form after editing contact details');
        await objUtil.clickObject(pgThinkingTester.submitBtn);

        await reporter.addLog('Wait for the return to contacts button');
        await pgThinkingTester.returnContactBtn.waitForExist({ timeout: 10000 });
        await objUtil.clickObject(pgThinkingTester.returnContactBtn);

        await reporter.addLog('Verify the updated postal code in the first contact row');
        await $('//table//tr[1]//td[7]').waitForExist({ timeout: 10000 });
        const postalCodeText = await $('//table//tr[1]//td[7]').getText();
        await expect(postalCodeText).toContain(strDateTime);

    });

    it('Heroku App Delete Contact TC005', async () => {
        await reporter.addLog('Navigate to the website');
        await pgThinkingTester.navigate();

        await reporter.addLog('Fill email field');
        await objUtil.setObjectValue(pgThinkingTester.loginEmail, generatedEmail);
    
        await reporter.addLog('Fill password field');
        const password = 'testing';
        await objUtil.setObjectValue(pgThinkingTester.loginPassword, password);

        await reporter.addLog('Submit the login form');
        await objUtil.clickObject(pgThinkingTester.loginBtn);
        await browser.pause(5000);

        await reporter.addLog('Wait for the contact to be displayed');
        await $('//table//tr[1]//td[2]').waitForExist({ timeout: 10000 });
    
        await reporter.addLog('Select the first contact');
        await objUtil.clickObject($('//table//tr[1]//td[2]'));
    
        await reporter.addLog('Wait for the delete contact button');
        await pgThinkingTester.deleteContactBtn.waitForExist({ timeout: 10000 });
        await browser.pause(10000);
    
        await reporter.addLog('Click the delete contact button');
        await objUtil.clickObject(pgThinkingTester.deleteContactBtn);
        await browser.pause(10000);
    
        await reporter.addLog('Accept the alert');
        await browser.acceptAlert();
        await browser.pause(10000);
    });

    it('Heroku App Export Contacts on File_TC006', async () => {

        await reporter.addLog('Navigate to the website');
        await pgThinkingTester.navigate();

        await reporter.addLog('Fill email field');
        await objUtil.setObjectValue(pgThinkingTester.loginEmail, generatedEmail);
    
        await reporter.addLog('Fill password field');
        const password = 'testing';
        await objUtil.setObjectValue(pgThinkingTester.loginPassword, password);

        await reporter.addLog('Submit the login form');
        await objUtil.clickObject(pgThinkingTester.loginBtn);
        await browser.pause(5000);

        await reporter.addLog('Wait for contacts table to appear');
        const table = await $('table');
        await table.waitForExist({ timeout: 10000 });
    
        await reporter.addLog('Counting contacts in the table');
        const rows = await table.$$('tr');
        const userCount = await rows.length;
    
        await reporter.addLog('Extracting contact data');
        const contactData = {};
    
        for (let i = 1; i < userCount; i++) {
            const cells = await rows[i].$$('td'); 
            const cellCount = cells.length;
    
            for (let j = 2; j <= cellCount; j++) {
                const header = await objUtil.getObjText($(`//thead//tr//th[${j - 1}]`));
                const data = await objUtil.getObjText($(`//table/tr[${i}]/td[${j}]`));
                contactData[header] = data;
            }
    
            
            await reporter.addLog(`Saving contact data to file for row ${i}`);
            await File.appendTxtFile(global.strPathContacts, JSON.stringify(contactData, null, 2));
        }
    
        await reporter.addLog('Successfully exported contact data to file');
    });
    
});
