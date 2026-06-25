package com.automation.base;

import com.microsoft.playwright.Page;
import com.automation.factory.PlaywrightFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;

public class BaseTest {
    protected Page page;

    @BeforeEach
    public void setUp() {
        page = PlaywrightFactory.createPage();
    }

    @AfterEach
    public void tearDown() {
        PlaywrightFactory.closeAll();
    }
}
