from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the running application
        page.goto("http://localhost:8081/")

        # Wait for the main heading to be visible
        expect(page.get_by_role("heading", name="vue-virtualscroll")).to_be_visible()

        # Load the "Big" dataset
        page.get_by_role("combobox").select_option("bigdata.json")

        # Add a delay to allow for data loading
        page.wait_for_timeout(3000)

        # Check for the visibility of the first item in the list
        expect(page.get_by_text("0 - ").first).to_be_visible()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Take a screenshot even on failure to help with debugging
        page.screenshot(path="jules-scratch/verification/verification_error.png")
        raise

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)