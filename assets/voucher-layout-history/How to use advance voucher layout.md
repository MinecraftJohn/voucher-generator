<div align="center">
  <img src="https://raw.githubusercontent.com/MinecraftJohn/wifi-connect/c7b20d4265e91d601fb6f1e531d9c90a1ff9ae15/assets/svg/wifi-connect-logo.svg" height="72" alt="Wi-Fi Connect Logo"/>
  <h1>Custom Voucher Design</h1>
</div>

> Note: Please ensure that you have Microsoft Office (Word and Excel) installed on your computer. Additionally, having a basic knowledge of these applications would be beneficial. If you do not have these applications installed on your computer, you can use the voucher generator as an alternative.

### What is this?

This is my hassle-free method for printing voucher codes on my customized voucher layout. Unlike the old method, where I had to manually copy each voucher code from the Omada Controller site one-by-one to my custom voucher layout, I can now scrape the voucher code from the Omada Controller site and paste it into an .xlsx file. Once I have scraped all the vouchers, I can then print the .docx file.

### How to use

1. Create a vouchers on your Omada Controller if no created yet.
2. I recommend to show `50 /page` for a fast scraping of data<br />
![50 /page](/assets/img/get-started/50-per-page.jpg)
3. On your Omada Controller site `right-click` and choose `Inspect Element` to Enable developer tool or press `F12`.<br />
![test](/assets/img/get-started/console-drawer.jpg)
4. On your web devtool paste this code in console drawer and press enter
   ```js
   let scrapedCodes = ""; document.querySelectorAll("[name='code'] .td-content .content").forEach((elmnt) => {scrapedCodes += elmnt.innerText + "\n"}); console.log(scrapedCodes);
   ```
5. Copy all the voucher codes then go to Excel paste it below the table header. Repeat the proccess until you copied all the desired voucher codes to print.<br />
![test](/assets/img/get-started/copy-paste-codes-old.jpg)
6. After pasting all the desired voucher codes to print open the Word file a pop-up message will appear then click Yes to continue. You can then print the document after checking if its really the right one.

Note: Sometimes the link of data for Word is broken, to fix this just relink the Recipient List at Mailings section in Word.

Download the Voucher Layout file here: [Voucher Layout - 2023 (ADVANCE).docx](https://www.dropbox.com/scl/fi/3ed7x786x8tyvmj7ndsv6/Voucher-Layout-2023-ADVANCED.docx?rlkey=wkzd5x4n9tqrb7745fuaa7tms&dl=1)<br />
Download the Excel file here: [Enter Voucher Codes here.xlsx](https://www.dropbox.com/scl/fi/kdokwxhrgbhdm3bqrdbfh/Enter-Voucher-Codes-here.xlsx?rlkey=z14q27racitcoki2xjvthj1ie&dl=1)