using System;
using System.Collections.Generic;
using System.Text;

namespace PropertyService
{
    public class PropertyService
    {
        private string GenerateHtml(List<PropertyForShabatDetailsDTO> listProperties)
        {
            var htmlBuilder = new StringBuilder();
            
            // Start HTML document
            htmlBuilder.AppendLine("<!DOCTYPE html>");
            htmlBuilder.AppendLine("<html lang=\"he\" dir=\"rtl\">");
            htmlBuilder.AppendLine("<head>");
            htmlBuilder.AppendLine("    <meta charset=\"UTF-8\">");
            htmlBuilder.AppendLine("    <title>מיד ליד - גליון 1</title>");
            htmlBuilder.AppendLine("    <style>");
            // Add your CSS here
            htmlBuilder.AppendLine("        @page { size: A4; margin: 0; }");
            htmlBuilder.AppendLine("        html, body { margin: 0; padding: 0; width: 100%; height: 100%; font-family: Arial, sans-serif; direction: rtl; background: white; box-sizing: border-box; }");
            htmlBuilder.AppendLine("        *, *:before, *:after { box-sizing: inherit; }");
            htmlBuilder.AppendLine("        .container { width: 21cm; max-width: 21cm; margin: 0 auto; box-sizing: border-box; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; padding: 0.1cm; overflow: hidden; page-break-after: always; page-break-inside: avoid; break-inside: avoid; position: relative; min-height: calc(29.7cm - 2cm); margin-bottom: 2cm; }");
            htmlBuilder.AppendLine("        .card { border: 4px solid #1a3b6d; border-top-right-radius: 0; border-bottom-left-radius: 0; border-top-left-radius: 32px; border-bottom-right-radius: 32px; position: relative; box-sizing: border-box; min-height: 0; height: 100%; background: #fff; display: flex; flex-direction: column; justify-content: flex-start; }");
            htmlBuilder.AppendLine("        .tag { position: absolute; top: 0; left: 0; background-color: #e4b147; color: #1a3b6d; font-weight: bold; padding: 2px 18px 2px 12px; border-bottom-right-radius: 22px 22px; border-top-left-radius: 18px 18px; font-size: 18px; z-index: 2; }");
            htmlBuilder.AppendLine("        .location { font-weight: bold; font-size: 18px; color: #1a3b6d; text-align: center; margin-top: 8px; margin-bottom: 8px; }");
            htmlBuilder.AppendLine("        .info-layout { display: flex; align-items: flex-start; justify-content: center; flex: 1; margin-bottom: 0; }");
            htmlBuilder.AppendLine("        .info-section.right { width: 80px; min-width: 80px; text-align: right; font-size: 15px; color: #1a3b6d; font-weight: bold; line-height: 1.3; }");
            htmlBuilder.AppendLine("        .info-section.left { flex: 1; text-align: right; font-size: 15px; color: #1a3b6d; font-weight: normal; line-height: 1.3; padding-right: 12px; }");
            htmlBuilder.AppendLine("        .divider { width: 1px; background-color: #1a3b6d; height: 60px; margin: 0 10px; align-self: center; }");
            htmlBuilder.AppendLine("        .icon { margin-left: 4px; vertical-align: middle; }");
            htmlBuilder.AppendLine("        .icon.rooms::before { content: \"\\1F697\"; font-size: 16px; margin-left: 2px; }");
            htmlBuilder.AppendLine("        .icon.floor::before { content: \"\\1F9D7\"; font-size: 16px; margin-left: 2px; }");
            htmlBuilder.AppendLine("        .icon.size::before { content: \"\\1F4CF\"; font-size: 16px; margin-left: 2px; }");
            htmlBuilder.AppendLine("        .price { font-size: 20px; font-weight: bold; color: #1a3b6d; margin-top: 8px; }");
            htmlBuilder.AppendLine("        .footer { background-color: #e4b147; color: #1a3b6d; font-weight: bold; font-size: 16px; padding: 5px 0; text-align: center; border-bottom-right-radius: 28px; border-top-left-radius: 8px; letter-spacing: 0.5px; white-space: nowrap; margin-top: auto; }");
            htmlBuilder.AppendLine("        .custom-header { display: flex; align-items: center; width: 100%; margin-top: 8px; margin-bottom: 12px; direction: rtl; page-break-after: avoid; break-after: avoid; direction: ltr; width: 90%; grid-column: 1 / -1; z-index: 20; background: white; }");
            htmlBuilder.AppendLine("        .header-label-bg { background: #1a3b6d; border-top-left-radius: 32px; border-bottom-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 32px; padding: 4px 24px 4px 16px; min-height: 36px; display: flex; align-items: center; margin-left: 8px; margin-right: 0; text-align: center; min-width: 120px; }");
            htmlBuilder.AppendLine("        .header-label { color: #e4b147; font-size: 2rem; font-weight: bold; font-family: inherit; white-space: nowrap; }");
            htmlBuilder.AppendLine("        .header-line { flex: 1; height: 6px; background: #1a3b6d; border-radius: 3px; margin-top: 8px; margin-right: 8px; }");
            htmlBuilder.AppendLine("        .page-footer { display: flex; flex-direction: column; align-items: flex-end; width: 17%; position: absolute; bottom: 0; right: 0; direction: ltr; page-break-before: avoid; page-break-inside: avoid; break-inside: avoid; text-align: center; margin-bottom: 0.5cm; z-index: 10; }");
            htmlBuilder.AppendLine("        .page-footer-line { width: 100%; height: 5px; background: #1a3b6d; border-radius: 2px; margin-bottom: 0; }");
            htmlBuilder.AppendLine("        .page-footer-label { color: #e4b147; font-size: 1rem; font-weight: bold; font-family: inherit; margin-top: 0; margin: auto; }");
            htmlBuilder.AppendLine("        @media print { body, .card, .footer, .tag, .custom-header { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .container { break-inside: avoid; page-break-inside: avoid; position: relative; margin-bottom: 2cm; } .card { break-inside: avoid; page-break-inside: avoid; } .custom-header { break-after: avoid; page-break-after: avoid; margin-top: 20px !important; grid-column: 1 / -1; z-index: 20; background: white; } .custom-header:first-of-type { margin-top: 10px !important; } .page-footer { position: absolute; bottom: 0; right: 0; break-inside: avoid; page-break-inside: avoid; page-break-before: avoid; break-before: avoid; z-index: 10; } }");
            htmlBuilder.AppendLine("    </style>");
            htmlBuilder.AppendLine("</head>");
            htmlBuilder.AppendLine("<body>");
            
            // Hidden cards container
            htmlBuilder.AppendLine("    <div id=\"all-cards\" style=\"display:none;\">");
            
            // Generate cards
            foreach (var property in listProperties)
            {
                htmlBuilder.AppendLine("        <div class=\"card\">");
                htmlBuilder.AppendLine("            <div class=\"tag\">תיווך</div>");
                htmlBuilder.AppendLine($"            <div class=\"location\">{property.CityName} - {property.StreetName}</div>");
                htmlBuilder.AppendLine("            <div class=\"info-layout\">");
                htmlBuilder.AppendLine("                <div class=\"info-section right\">");
                htmlBuilder.AppendLine($"                    <div><span class=\"icon rooms\"></span>{property.NumberOfRoomsName}</div>");
                htmlBuilder.AppendLine($"                    <div><span class=\"icon floor\"></span>קומה {property.Floor}</div>");
                htmlBuilder.AppendLine($"                    <div><span class=\"icon size\"></span>{property.PropertySizeInMeters} מ\"ר</div>");
                htmlBuilder.AppendLine("                </div>");
                htmlBuilder.AppendLine("                <div class=\"divider\"></div>");
                htmlBuilder.AppendLine("                <div class=\"info-section left\">");
                htmlBuilder.AppendLine("                    <div>");
                if (property.IsThereOptions)
                {
                    htmlBuilder.AppendLine("                        <text>אופציה</text>");
                }
                if (property.IsThereParcking)
                {
                    htmlBuilder.AppendLine("                        <text>חניה</text>");
                }
                htmlBuilder.AppendLine("                    </div>");
                htmlBuilder.AppendLine($"                    <div class=\"price\">₪{property.Price?.ToString(\"N0\")}</div>");
                htmlBuilder.AppendLine("                </div>");
                htmlBuilder.AppendLine("            </div>");
                htmlBuilder.AppendLine($"            <div class=\"footer\">תיווך {property.FullName} {property.Phone}</div>");
                htmlBuilder.AppendLine("        </div>");
            }
            
            htmlBuilder.AppendLine("    </div>");
            htmlBuilder.AppendLine("    <div id=\"pages-root\"></div>");
            
            // Add JavaScript
            htmlBuilder.AppendLine("    <script>");
            htmlBuilder.AppendLine("        const headerLabels = [\"מכירה\", \"להשכרה\", \"מבצע\"];");
            htmlBuilder.AppendLine("        const footerLabels = [\"גליון 1\", \"גליון 2\", \"גליון 3\"];");
            htmlBuilder.AppendLine("        const allCards = Array.from(document.querySelectorAll('#all-cards .card'));");
            htmlBuilder.AppendLine("        const pagesRoot = document.getElementById('pages-root');");
            htmlBuilder.AppendLine("        const container = document.createElement('div');");
            htmlBuilder.AppendLine("        container.className = 'container';");
            htmlBuilder.AppendLine("        const header = document.createElement('div');");
            htmlBuilder.AppendLine("        header.className = 'custom-header';");
            htmlBuilder.AppendLine("        header.innerHTML = `<div class=\"header-label-bg\"><span class=\"header-label\">${headerLabels[0] || \"מכירה\"}</span></div><div class=\"header-line\"></div>`;");
            htmlBuilder.AppendLine("        container.appendChild(header);");
            htmlBuilder.AppendLine("        allCards.forEach((card, i) => {");
            htmlBuilder.AppendLine("            if (i === 1) {");
            htmlBuilder.AppendLine("                const imagePlaceholder = document.createElement('div');");
            htmlBuilder.AppendLine("                imagePlaceholder.className = 'card';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.background = '#f0f0f0';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.display = 'flex';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.alignItems = 'center';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.justifyContent = 'center';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.border = 'none';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.borderRadius = '0';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.padding = '0';");
            htmlBuilder.AppendLine("                imagePlaceholder.style.overflow = 'hidden';");
            htmlBuilder.AppendLine("                imagePlaceholder.innerHTML = '<img src=\"https://www.mako.co.il/_next/image?url=https%3A%2F%2Fimg.mako.co.il%2F2024%2F01%2F08%2Fguy_pines6_43_080323_03_ido_autoOrient_i.jpg&w=640&q=75\" alt=\"Advertisement\" style=\"width: 100%; height: 100%; object-fit: cover; display: block;\">';");
            htmlBuilder.AppendLine("                container.appendChild(imagePlaceholder);");
            htmlBuilder.AppendLine("            }");
            htmlBuilder.AppendLine("            if (i === 3) {");
            htmlBuilder.AppendLine("                const wideImagePlaceholder = document.createElement('div');");
            htmlBuilder.AppendLine("                wideImagePlaceholder.className = 'card';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.background = '#f0f0f0';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.display = 'flex';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.alignItems = 'center';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.justifyContent = 'center';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.border = 'none';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.borderRadius = '0';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.padding = '0';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.overflow = 'hidden';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.style.gridColumn = 'span 2';");
            htmlBuilder.AppendLine("                wideImagePlaceholder.innerHTML = '<img src=\"https://www.mako.co.il/_next/image?url=https%3A%2F%2Fimg.mako.co.il%2F2024%2F01%2F08%2Fguy_pines6_43_080323_03_ido_autoOrient_i.jpg&w=640&q=75\" alt=\"Wide Advertisement\" style=\"width: 100%; height: 100%; object-fit: cover; display: block;\">';");
            htmlBuilder.AppendLine("                container.appendChild(wideImagePlaceholder);");
            htmlBuilder.AppendLine("            }");
            htmlBuilder.AppendLine("            container.appendChild(card);");
            htmlBuilder.AppendLine("        });");
            htmlBuilder.AppendLine("        const footer = document.createElement('div');");
            htmlBuilder.AppendLine("        footer.className = 'page-footer';");
            htmlBuilder.AppendLine("        footer.innerHTML = `<div class=\"page-footer-line\"></div><span class=\"page-footer-label\">${footerLabels[0] || \"גליון 1\"}</span>`;");
            htmlBuilder.AppendLine("        container.appendChild(footer);");
            htmlBuilder.AppendLine("        pagesRoot.appendChild(container);");
            htmlBuilder.AppendLine("    </script>");
            htmlBuilder.AppendLine("</body>");
            htmlBuilder.AppendLine("</html>");
            
            return htmlBuilder.ToString();
        }
    }
} 