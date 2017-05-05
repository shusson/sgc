import { browser, element, by } from 'protractor';

export class AboutPage {
    navigateTo() {
        browser.driver.manage().window().setSize(1201, 1000);
        return browser.get('/about');
    }

    getNavBar() {
        return element(by.css('nav')).all(by.tagName('a'));
    }

    getArticle() {
        return element.all(by.tagName('article'));
    }
}
