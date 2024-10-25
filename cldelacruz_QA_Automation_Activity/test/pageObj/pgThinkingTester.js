class Page {
    // Locators for Login Page (used in TC001)
    get signUpBtn() {
        return $('//button[@id="signup"]');}

    get firstNameInput() {
        return $('//input[@id="firstName"]');}

    get lastNameInput() {
        return $('//input[@id="lastName"]');}

    get emailInput() {return $('//input[@id="email"]');}

    get passwordInput() {
        return $('//input[@id="password"]');}

    get submitBtn() {
        return $('//button[@id="submit"]');}

        
    // Locators for Login Page (used in TC002)
    get loginEmail() {
        return $('//input[@id="email"]');}

    get loginPassword() {
        return $('//input[@id="password"]');}

    get loginBtn() {
        return $('//button[@id="submit"]');}


    // Locators for Add Contact Page (used in TC003)
    get addContactBtn() {
        return $('//button[@id="add-contact"]');}

    get firstNameEdit() {
        return $('//input[@id="firstName"]');}

    get lastNameEdit() {
        return $('//input[@id="lastName"]');}

    get birthdayEdit() {
        return $('//input[@id="birthdate"]');}

    get emailEdit() {
        return $('//input[@id="email"]');}

    get phoneEdit() {
        return $('//input[@id="phone"]');}

    get street1Edit() {
        return $('//input[@id="street1"]');}

    get street2Edit() {
        return $('//input[@id="street2"]');}

    get cityEdit() {
        return $('//input[@id="city"]');}

    get stateProvinceEdit() {
        return $('//input[@id="stateProvince"]');}

    get postalCodeEdit() {
        return $('//input[@id="postalCode"]');}

    get countryEdit() {
        return $('//input[@id="country"]');}

    get editContactBtn() {
        return $('//button[@id="edit-contact"]');}

    get deleteContactBtn()  {
         return $('//button[@id="delete"]');}


    get returnContactBtn() {
        return $('//button[@id="return"]');}


    // Locators for Table and Contact Rows (for TC006)
    get contactTable() {return $('table');}

    get contactRows() {return this.contactTable.$$('tr');}

    get tableHeaders() {return $$('thead//tr//th');}

    getTableCell(rowIndex, colIndex) {return $(`//table//tr[${rowIndex}]/td[${colIndex}]`);}


    async navigate() {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/');}


    async generateBirth(){
        const year = Math.floor(Math.random() * (2005 - 1950 + 1)) + 2005;
        const month = Math.floor(Math.random() * 12) + 1;
        const daysInMonth = new Date(year, month, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

}

export default new Page();
