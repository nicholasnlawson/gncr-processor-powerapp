import { IInputs, IOutputs } from "./generated/ManifestTypes";

// List of non-medication items to always preselect for deletion
const NON_MEDICATION_ITEMS = [
    "Acti-Fast 2-Way Stretch Stockinette 10.75 cm x 5 m (yellow line)",
    "Activa class I below knee stocking circular knit standard stock size closed toe Extra large Black (L&R Medical UK Ltd)",
    "Activa class I below knee stocking circular knit standard stock size open toe Extra large Sand (L&R Medical UK Ltd)",
    "Activa class II below knee stocking circular knit standard stock size closed toe Large Black (L&R Medical UK Ltd)",
    "Activa class II below knee stocking circular knit standard stock size closed toe Small Sand (L&R Medical UK Ltd)",
    "BD AutoShield Duo hypodermic insulin needles for pre-filled / reusable pen injectors screw on 5mm/30gauge (Becton, Dickinson UK Ltd)",
    "BD Micro-Fine Ultra hypodermic insulin needles for pre-filled / reusable pen injectors screw on 5mm/31gauge (Becton, Dickinson UK Ltd)",
    "Brava adhesive remover spray 12010 (Coloplast Ltd)",
    "Brava elastic tape 12070 (Coloplast Ltd)",
    "Brava elastic tape XL 12076 (Coloplast Ltd)",
    "Brava protective seal 12039 2.5mm thick, 34mm-64mm diameter (Coloplast Ltd)",
    "Brava skin cleanser wipes 12080 (Coloplast Ltd)",
    "Brillant AquaFlate all silicone catheter male 12Ch DA310112 10ml balloon (Teleflex)",
    "ConvaMax Superabsorber dressing (non-adhesive) 10cm x 10cm square (ConvaTec Ltd)",
    "Contour testing strips (Ascensia Diabetes Care UK Ltd)",
    "Cosmopor dressing 5cm x 7.2cm (Paul Hartmann Ltd)",
    "Cosmopor E dressing 8cm x 10cm (Paul Hartmann Ltd)",
    "Flaminal Forte gel dressing (Flen Health UK Ltd)",
    "Flaminal Forte Protease-Modulating Matrix Gel 15 g",
    "Folysil all silicone catheter male 14Ch AA7114 10ml balloon (Coloplast Ltd)",
    "FreeStyle Libre 2 Plus Sensor (Abbott Laboratories Ltd)",
    "FreeStyle Libre 2 Sensor (Abbott Laboratories Ltd)",
    "GB4 drainable night drainage bag 10400W 2litre (Great Bear Healthcare Ltd)",
    "Glucofix Tech Sensor testing strips (A. Menarini Diagnostics Ltd)",
    "Glucoject lancets PLUS 0.2mm/33gauge (A. Menarini Diagnostics Ltd)",
    "GlucoRx CarePoint hypodermic insulin needles for pre-filled / reusable pen injectors screw on 4mm/31gauge (GlucoRx Ltd)",
    "GlucoRx CarePoint hypodermic insulin needles for pre-filled / reusable pen injectors screw on 5mm/31gauge (GlucoRx Ltd)",
    "GlucoRx CarePoint Ultra hypodermic insulin needles for pre-filled / reusable pen injectors screw on 4mm/32gauge (GlucoRx Ltd)",
    "GlucoRx FinePoint hypodermic insulin needles for pre-filled / reusable pen injectors screw on 4mm/31gauge (GlucoRx Ltd)",
    "GlucoRx FinePoint Ultra hypodermic insulin needles for pre-filled / reusable pen injectors screw on 4mm/32gauge (GlucoRx Ltd)",
    "GlucoRx lancets 0.31mm/30gauge (GlucoRx Ltd)",
    "GlucoRx Nexus testing strips (GlucoRx Ltd)",
    "GlucoRx Q testing strips (GlucoRx Ltd)",
    "GreenFine hypodermic insulin needles for pre-filled / reusable pen injectors screw on 6mm/31gauge (Neon Diagnostics Ltd)",
    "Haddenham Comfiwave (15-21mmHg) below knee open toe lymphoedema garment regular large (Haddenham Healthcare Ltd)",
    "Independence No Sting barrier film wipes BW1 (Independence Products Ltd)",
    "Independence Xtra large wound drainage bag with extra dressing VAP2 (Independence Products Ltd)",
    "KerraMaxCare dressing 20cm x 22cm rectangular (Crawford Healthcare Ltd)",
    "KetoSens testing strips PKA1E0020 (Spirit Healthcare Ltd)",
    "Ketostix testing strips (Ascensia Diabetes Care UK Ltd)",
    "Leg bag strap 15LS (Bard Ltd)",
    "Libra calf leg bag strap 10622C (Great Bear Healthcare Ltd)",
    "Libra sterile leg bag 10104E 500ml bag, long tube (Great Bear Healthcare Ltd)",
    "Libra thigh leg bag strap 10637T (Clinisupplies GB Ltd)",
    "LoFric Sense hydrophilic catheter female 12Ch 4161225 15cm (Wellspect HealthCare)",
    "Microlet lancets 0.5mm/28gauge (Ascensia Diabetes Care UK Ltd)",
    "Navina anal irrigation system rectal catheter set 68940 (Wellspect HealthCare)",
    "Navina Consumable Set 69003 (Wellspect HealthCare)",
    "OptiLube Active sterile lubricating jelly (Optimum Medical Solutions Ltd)",
    "Prosys all silicone catheter male 16Ch PCF16M10 10ml balloon (CliniSupplies Ltd)",
    "Prosys catheter retaining strap adult PCS50 (CliniSupplies Ltd)",
    "Prosys single use non-sterile drainable night drainage bag PSU2 2litre (CliniSupplies Ltd)",
    "Prosys sterile drainable night drainage bag with lever tap P2000-LT 2litre (CliniSupplies Ltd)",
    "Prosys sterile drainable night drainage bag with slide tap P2000 2litre (CliniSupplies Ltd)",
    "Prosys sterile leg bag with lever tap P500L-LT 500ml bag, long tube (CliniSupplies Ltd)",
    "Prosys sterile leg bag with lever tap P500S-LT 500ml bag, short tube (CliniSupplies Ltd)",
    "Prosys sterile leg bag with non-flocked back and lever tap PH500S-LT 500ml bag, short tube (CliniSupplies Ltd)",
    "Prosys sterile leg bag with slide tap P500L 500ml bag, long tube (CliniSupplies Ltd)",
    "Prosys sterile leg bag with slide tap P500S 500ml bag, short tube (CliniSupplies Ltd)",
    "SenSura Mio Concave ileostomy bag with filter, maxi 18230 Starter hole 10mm-60mm Neutral grey (Coloplast Ltd)",
    "Sharpsafe disposal unit 1litre Yellow (Vernacare International Ltd)",
    "Sharpsafe disposal unit 7litre Yellow (Vernacare International Ltd)",
    "Simpla G-Strap abdominal 383003 90cm (Coloplast Ltd)",
    "Simpla G-Strap adult 383001 50cm (Coloplast Ltd)",
    "Spirit sterile leg bag DSLB500L 500ml bag, 30cm long tube (Bard Ltd)",
    "Sympacath AquaFlate hydrogel coated latex catheter male 18Ch DH310118 10ml balloon (Teleflex)",
    "Unistik 3 Comfort lancets 1.8mm/28gauge (Owen Mumford Ltd)",
    "Urethral catheter male 14Ch 310-1101-D414 10ml balloon (Medasil (Surgical) Ltd)",
];

interface PatientInfo {
    surname: string;
    firstName: string;
    nhsNumber: string;
    dob: string;
    dischargeDate: string;
}

export class GNCRProcessor implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private root: HTMLDivElement;
    private initialProcessedData = "";
    private copyStatusTimer: number | undefined;

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        context.mode.trackContainerResize(true);
        this.root = document.createElement("div");
        this.root.className = "gncr-processor";
        this.root.innerHTML = `
            <h1>Medication Data Processor</h1>
            <div id="inputSection">
                <label for="dataType">Select data type:</label>
                <select id="dataType">
                    <option value="gp">GNCR</option>
                    <option value="discharge">Pharmacy Discharge Letter</option>
                </select>
                <br /><br />
                <label for="rawData">Paste Raw Data Here:</label><br />
                <textarea id="rawData" rows="15" cols="75"></textarea><br />
                <button data-action="processData">Process Data</button>
            </div>
            <div id="formattedData" style="display: none">
                <div id="buttonContainer" class="button-container">
                    <button data-action="deleteSelectedRows">Delete Selected</button>
                    <button data-action="resetSelection">Reset</button>
                    <button data-action="alphabetizeRepeatMedication">Alphabetise Repeat Medication</button>
                    <button data-action="printData">Print</button>
                    <button data-action="copyPageContent">Copy Page Content</button>
                    <button data-action="goHome">Home</button>
                </div>
                <div id="copyStatus" class="gncr-copy-status" role="status" style="display: none"></div>
                <div id="output"></div>
            </div>
            <div id="disclaimerFooter" class="gncr-disclaimer">
                This system has been developed and is maintained by STDH Pharmacy
                Department. Any issues or queries must be directed to the pharmacy and NOT
                to the IT helpdesk or Information Services.<br />
                Contact: Email: nicholas.lawson@nhs.uk | Telephone: (71)2835 or 0191 404 1058
            </div>
        `;
        container.appendChild(this.root);

        const actions: Record<string, () => void> = {
            processData: () => this.processData(),
            deleteSelectedRows: () => this.deleteSelectedRows(),
            resetSelection: () => this.resetSelection(),
            alphabetizeRepeatMedication: () => this.alphabetizeRepeatMedication(),
            printData: () => this.printData(),
            copyPageContent: () => this.copyPageContent(),
            goHome: () => this.goHome(),
        };
        this.root.querySelectorAll<HTMLButtonElement>("button[data-action]").forEach((btn) => {
            const action = btn.dataset.action;
            if (action && actions[action]) {
                btn.addEventListener("click", actions[action]);
            }
        });
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Nothing dynamic bound; the control is self-contained.
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        this.root.remove();
    }

    // ---- DOM helpers (scoped to this control instance) ----

    private q<T extends HTMLElement>(selector: string): T {
        return this.root.querySelector(selector) as T;
    }

    private setOutputHtml(html: string): void {
        const output = this.q<HTMLDivElement>("#output");
        output.innerHTML = html;
        this.bindRowHandlers();
    }

    // Generated HTML uses inline onclick="toggleRowSelection(this)" markers
    // (kept identical to the original tool); replace them with real listeners.
    private bindRowHandlers(): void {
        this.root.querySelectorAll<HTMLTableRowElement>("#output tr[onclick]").forEach((row) => {
            row.removeAttribute("onclick");
            row.addEventListener("click", () => this.toggleRowSelection(row));
        });
    }

    // ---- Ported logic from GNCR+TTOprocessor (unchanged behaviour) ----

    private isNonMedicationItem(item: string): boolean {
        return NON_MEDICATION_ITEMS.some(
            (nonMed) => item && item.trim().toLowerCase() === nonMed.trim().toLowerCase()
        );
    }

    private extractPatientInfo(rawData: string): PatientInfo {
        const lines = rawData.split("\n");
        const patientInfo: PatientInfo = {
            surname: "",
            firstName: "",
            nhsNumber: "",
            dob: "",
            dischargeDate: "",
        };

        function formatNHSNumber(nhsNumber: string): string {
            nhsNumber = nhsNumber.replace(/\s/g, "");
            return `${nhsNumber.substr(0, 3)} ${nhsNumber.substr(3, 3)} ${nhsNumber.substr(6)}`;
        }

        // GNCR format
        if (lines[0].includes(",")) {
            // Name
            const nameParts = lines[0].split(",");
            patientInfo.surname = nameParts[0].trim();
            patientInfo.firstName = nameParts[1] ? nameParts[1].trim() : "";

            // NHS Number
            const nhsMatch = rawData.match(/NHS No\s*(\d{3}\s*\d{3}\s*\d{4})/);
            if (nhsMatch) {
                patientInfo.nhsNumber = formatNHSNumber(nhsMatch[1]);
            }

            // Date of Birth
            const dobMatch = rawData.match(/Born\s*(\d{2}\/\d{2}\/\d{4})/);
            if (dobMatch) {
                patientInfo.dob = dobMatch[1];
            }
        }
        // Discharge letter format
        else {
            const nameRegex = /Patient Name:\s*([^,]+),\s*([^\n]+)/;
            const nhsNumberRegex = /NHS Number:\s*(\d{3}\s*\d{3}\s*\d{4})/;
            const dobRegex = /Date of Birth:\s*(\d{2}\/\d{2}\/\d{4})/;
            const dischargeDateRegex = /Date:\s*(\d{2}\/\d{2}\/\d{2})/;

            const nameMatch = rawData.match(nameRegex);
            const nhsNumberMatch = rawData.match(nhsNumberRegex);
            const dobMatch = rawData.match(dobRegex);
            const dischargeDateMatch = rawData.match(dischargeDateRegex);

            if (nameMatch) {
                patientInfo.surname = nameMatch[1].trim();
                patientInfo.firstName = nameMatch[2].trim();
            }
            if (nhsNumberMatch) {
                patientInfo.nhsNumber = formatNHSNumber(nhsNumberMatch[1]);
            }
            if (dobMatch) {
                patientInfo.dob = dobMatch[1];
            }
            if (dischargeDateMatch) {
                patientInfo.dischargeDate = dischargeDateMatch[1];
            }
        }

        return patientInfo;
    }

    private processAllergiesSection(rawData: string): string {
        const allergiesStartIndex = rawData.indexOf("Current Allergies and Adverse Reactions");
        const allergiesEndIndex = rawData.indexOf("Acute Medication (Last 12 Months)", allergiesStartIndex);
        const allergiesSection = rawData.substring(allergiesStartIndex, allergiesEndIndex).trim();
        let sectionOutputHtml = `
    <style>
        #allergiesTable {
            width: 100%;
            table-layout: fixed;
        }
        #allergiesTable th:nth-child(1),
        #allergiesTable td:nth-child(1) { width: 15%; }
        #allergiesTable th:nth-child(2),
        #allergiesTable td:nth-child(2) { width: 50%; }
        #allergiesTable th:nth-child(3),
        #allergiesTable td:nth-child(3) { width: 35%; }
    </style>
    <table border='1' id='allergiesTable'><tr><th>Date</th><th>Allergy Details</th><th>Patient Comments</th></tr>`;
        if (
            allergiesSection.includes(
                "No 'Current Allergies and Adverse Reactions' data is recorded for this patient."
            )
        ) {
            sectionOutputHtml += `<tr onclick="toggleRowSelection(this)"><td></td><td>No current allergies or adverse reactions data recorded for this patient.</td><td></td></tr>`;
        } else {
            const entries = allergiesSection.split(
                /\n(?=\d{2}(-|\s)\w{3}(-|\s)\d{4}|\n(?=Not Known)|\n(?=\d{4}))/
            );
            const allergyDetails: Record<string, boolean> = {};
            const currentEntry = {
                date: "",
                details: "",
            };
            entries.forEach(function (entry) {
                if (entry === undefined) return;
                const lines = entry.trim().split("\n");
                for (const rawLine of lines) {
                    const line = rawLine.trim();
                    const dateMatch = line.match(/^(\d{2}(-|\s)\w{3}(-|\s)\d{4}|\d{4})/);
                    const notKnownMatch = line.match(/^Not Known/);
                    if (dateMatch) {
                        if (currentEntry.date !== "" && currentEntry.details !== "") {
                            const rowClass = allergyDetails[currentEntry.details]
                                ? "preselected selected"
                                : "";
                            sectionOutputHtml += `<tr onclick="toggleRowSelection(this)" class="${rowClass}"><td>${currentEntry.date}</td><td>${currentEntry.details}</td><td></td></tr>`;
                            allergyDetails[currentEntry.details] = true;
                        }
                        currentEntry.date = dateMatch[0].replace(/\s/g, "-");
                        currentEntry.details = line.substring(dateMatch[0].length).trim();
                    } else if (notKnownMatch) {
                        if (currentEntry.date !== "" && currentEntry.details !== "") {
                            const rowClass = allergyDetails[currentEntry.details]
                                ? "preselected selected"
                                : "";
                            sectionOutputHtml += `<tr onclick="toggleRowSelection(this)" class="${rowClass}"><td>${currentEntry.date}</td><td>${currentEntry.details}</td><td></td></tr>`;
                            allergyDetails[currentEntry.details] = true;
                        }
                        currentEntry.date = "Not Known";
                        currentEntry.details = line.substring(notKnownMatch[0].length).trim();
                    } else {
                        if (currentEntry.details !== "") {
                            currentEntry.details += ", ";
                        }
                        currentEntry.details += line;
                    }
                }
            });
            if (currentEntry.date !== "" && currentEntry.details !== "") {
                const rowClass = allergyDetails[currentEntry.details] ? "preselected selected" : "";
                sectionOutputHtml += `<tr onclick="toggleRowSelection(this)" class="${rowClass}"><td>${currentEntry.date}</td><td>${currentEntry.details}</td><td></td></tr>`;
                allergyDetails[currentEntry.details] = true;
            }
        }
        sectionOutputHtml += "</table><br>";
        sectionOutputHtml = this.removeHyphens(sectionOutputHtml);
        sectionOutputHtml = this.removeDoubleCommas(sectionOutputHtml);
        return sectionOutputHtml;
    }

    private removeHyphens(html: string): string {
        return html.replace(/, -, -/g, "");
    }

    private removeDoubleCommas(html: string): string {
        return html.replace(/, ,/g, "");
    }

    private oldAcuteMedications(dateString: string): boolean {
        const parts = dateString.split(/[-\s]/);
        const day = parseInt(parts[0], 10);
        const month = this.getMonthNumber(parts[1]);
        const year = parseInt(parts[2], 10);
        const startDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - startDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        return daysDiff > 42;
    }

    private processAcuteMedicationSection(rawData: string): string {
        const acuteStartIndex = rawData.indexOf("Acute Medication (Last 12 Months)");
        const acuteEndIndex = rawData.indexOf("Current Repeat Medication", acuteStartIndex);
        const acuteSection = rawData
            .substring(acuteStartIndex, acuteEndIndex !== -1 ? acuteEndIndex : undefined)
            .trim();

        let lines = acuteSection.split("\n");
        const dataStart =
            lines.findIndex((line) => line.startsWith("Type\tStart Date\tMedication Item")) + 1;

        let sectionOutputHtml =
            "<table border='1'><tr><th>Start Date</th><th>Acute Medication Item</th><th>Dosage Instruction</th><th>Quantity</th><th>Comments</th></tr>";

        if (
            acuteSection.includes(
                "No 'Acute Medication (Last 12 Months)' data is recorded for this patient."
            )
        ) {
            sectionOutputHtml += `<tr onclick="toggleRowSelection(this)"><td></td><td>No 'Acute Medication (Last 12 Months)' data is recorded for this patient.</td><td></td><td></td><td></td></tr>`;
        } else {
            lines = lines.slice(dataStart);
            let processingData = false;
            lines.forEach((line) => {
                if (line.trim() === "") return;

                if (!processingData && (line.startsWith("Acute") || line.includes("\t"))) {
                    processingData = true;
                }

                if (processingData) {
                    const parts = line.split("\t");
                    while (parts.length < 5) parts.push("");
                    const [type, startDateRaw, medicationItem, dosageInstruction, quantity] = parts;
                    if (type.startsWith("Acute")) {
                        const startDate = startDateRaw.replace(/\s/g, "-");
                        const rowClass =
                            this.oldAcuteMedications(startDate) || this.isNonMedicationItem(medicationItem)
                                ? "preselected selected"
                                : "";
                        sectionOutputHtml += `<tr onclick="toggleRowSelection(this)" class="${rowClass}"><td>${startDate}</td><td>${medicationItem}</td><td>${dosageInstruction}</td><td>${quantity}</td><td></td></tr>`;
                    }
                }
            });

            const parser = new DOMParser();
            let htmlDoc = parser.parseFromString(sectionOutputHtml, "text/html");
            let tableRows = htmlDoc.querySelectorAll("tr");
            const singleLineSuccess = Array.from(tableRows).some((row) => {
                const cells = row.querySelectorAll("td");
                return cells.length > 1 && (cells[1].textContent ?? "").trim() !== "";
            });

            if (!singleLineSuccess) {
                sectionOutputHtml =
                    "<table border='1'><tr><th>Start Date</th><th>Acute Medication Item</th><th>Dosage Instruction</th><th>Quantity</th><th>Comments</th></tr>";
                let currentEntry: string[] = [];
                lines.forEach((line) => {
                    if (line.trim() === "") return;

                    if (line.startsWith("Acute")) {
                        if (currentEntry.length) {
                            const startDate = currentEntry[0].replace(/\s/g, "-");
                            const rowClass =
                                this.oldAcuteMedications(startDate) ||
                                this.isNonMedicationItem(currentEntry[1])
                                    ? "preselected selected"
                                    : "";
                            sectionOutputHtml += this.formatEntry(currentEntry.slice(0, 4), rowClass);
                            currentEntry = [];
                        }
                        return;
                    }

                    currentEntry.push(line);

                    if (currentEntry.length >= 8 && !line.startsWith("•")) {
                        const startDate = currentEntry[0].replace(/\s/g, "-");
                        const rowClass =
                            this.oldAcuteMedications(startDate) ||
                            this.isNonMedicationItem(currentEntry[1])
                                ? "preselected selected"
                                : "";
                        sectionOutputHtml += this.formatEntry(currentEntry.slice(0, 4), rowClass);
                        currentEntry = [];
                    }
                });

                if (currentEntry.length) {
                    const startDate = currentEntry[0].replace(/\s/g, "-");
                    const rowClass =
                        this.oldAcuteMedications(startDate) || this.isNonMedicationItem(currentEntry[1])
                            ? "preselected selected"
                            : "";
                    sectionOutputHtml += this.formatEntry(currentEntry.slice(0, 4), rowClass);
                }
            }

            htmlDoc = parser.parseFromString(sectionOutputHtml, "text/html");
            tableRows = htmlDoc.querySelectorAll("tr");

            tableRows.forEach((row) => {
                const cells = row.querySelectorAll("td");
                if (
                    cells.length === 5 &&
                    (cells[0].textContent ?? "").trim() === "Type" &&
                    (cells[1].textContent ?? "").trim() === "Start Date" &&
                    (cells[2].textContent ?? "").trim() === "Medication Item" &&
                    (cells[3].textContent ?? "").trim() === "Dosage Instruction" &&
                    (cells[4].textContent ?? "").trim() === ""
                ) {
                    row.remove();
                }
            });

            sectionOutputHtml = htmlDoc.body.innerHTML;
        }

        sectionOutputHtml += "</table><br>";
        return sectionOutputHtml;
    }

    private formatEntry(entryLines: string[], rowClass: string): string {
        const entry = {
            startDate: entryLines[0],
            medicationItem: entryLines[1],
            dosageInstruction: entryLines[2],
            quantity: entryLines[3],
            comments: "",
        };

        return `<tr onclick="toggleRowSelection(this)" class="${rowClass}">
                <td>${entry.startDate}</td>
                <td>${entry.medicationItem}</td>
                <td>${entry.dosageInstruction}</td>
                <td>${entry.quantity}</td>
                <td>${entry.comments}</td>
            </tr>`;
    }

    private getMonthNumber(monthAbbr: string): number {
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        return monthNames.indexOf(monthAbbr) + 1;
    }

    private processRepeatMedicationSection(rawData: string): string {
        const repeatStartIndex = rawData.indexOf("Current Repeat Medication");
        const repeatEndIndex = rawData.indexOf("Acute Medication (Last 12 Months)", repeatStartIndex);
        const repeatSection = rawData
            .substring(repeatStartIndex, repeatEndIndex !== -1 ? repeatEndIndex : undefined)
            .trim();

        let lines = repeatSection.split("\n");
        const dataStart =
            lines.findIndex((line) => line.startsWith("Type\tStart Date\tMedication Item")) + 1;

        let sectionOutputHtml =
            "<table border='1'><tr><th>Start Date</th><th>Repeat Medication Item</th><th>Dosage Instruction</th><th>Quantity</th><th>Last Issued Date</th><th>Comments</th></tr>";

        if (
            repeatSection.includes("No 'Current Repeat Medication' data is recorded for this patient.")
        ) {
            return "<table border='1'><tr><th>Start Date</th><th>Repeat Medication Item</th><th>Dosage Instruction</th><th>Quantity</th><th>Last Issued Date</th><th>Comments</th></tr><tr onclick=\"toggleRowSelection(this)\"><td></td><td>No 'Current Repeat Medication' data is recorded for this patient.</td><td></td><td></td><td></td><td></td></tr></table>";
        }

        lines = lines.slice(dataStart);
        let processingData = false;
        lines.forEach((line) => {
            if (line.trim() === "") return;

            if (!processingData && (line.startsWith("Repeat") || line.includes("\t"))) {
                processingData = true;
            }

            if (processingData) {
                const parts = line.split("\t");
                while (parts.length < 10) parts.push("");
                const [type, startDate, medicationItem, dosageInstruction, quantity, lastIssuedDate] =
                    parts;
                if (
                    type.toLowerCase().includes("repeat dispense") ||
                    type.toLowerCase().includes("repeat dispensing")
                ) {
                    const lastIssuedDateText = this.isValidDate(lastIssuedDate)
                        ? `${lastIssuedDate} *Repeat Dispense*`
                        : "*Repeat Dispense*";
                    const rowClass = this.isNonMedicationItem(medicationItem)
                        ? "preselected selected"
                        : "";
                    sectionOutputHtml += `<tr onclick="toggleRowSelection(this)" class="${rowClass}"><td>${startDate}</td><td>${medicationItem}</td><td>${dosageInstruction}</td><td>${quantity}</td><td>${lastIssuedDateText}</td><td></td></tr>`;
                } else if (type.startsWith("Repeat") || type.startsWith("Automatic")) {
                    const lastIssuedDateText = this.isValidDate(lastIssuedDate) ? lastIssuedDate : "";
                    const rowClass = this.isNonMedicationItem(medicationItem)
                        ? "preselected selected"
                        : "";
                    sectionOutputHtml += `<tr onclick="toggleRowSelection(this)" class="${rowClass}"><td>${startDate}</td><td>${medicationItem}</td><td>${dosageInstruction}</td><td>${quantity}</td><td>${lastIssuedDateText}</td><td></td></tr>`;
                }
            }
        });

        const parser = new DOMParser();
        let htmlDoc = parser.parseFromString(sectionOutputHtml, "text/html");
        let tableRows = htmlDoc.querySelectorAll("tr");
        const singleLineSuccess = Array.from(tableRows).some((row) => {
            const cells = row.querySelectorAll("td");
            return cells.length > 1 && (cells[1].textContent ?? "").trim() !== "";
        });

        if (!singleLineSuccess) {
            sectionOutputHtml =
                "<table border='1'><tr><th>Start Date</th><th>Repeat Medication Item</th><th>Dosage Instruction</th><th>Quantity</th><th>Last Issued Date</th><th>Comments</th></tr>";
            let currentEntry: string[] = [];
            lines.forEach((line) => {
                if (line.trim() === "") return;

                if (line.startsWith("Repeat") || line.startsWith("Automatic")) {
                    if (currentEntry.length) {
                        sectionOutputHtml += this.formatRepeatEntry(currentEntry.slice(0, 6));
                        currentEntry = [];
                    }
                    return;
                }

                currentEntry.push(line);

                if (currentEntry.length >= 10 && !line.startsWith("•")) {
                    sectionOutputHtml += this.formatRepeatEntry(currentEntry.slice(0, 6));
                    currentEntry = [];
                }
            });

            if (currentEntry.length) {
                sectionOutputHtml += this.formatRepeatEntry(currentEntry.slice(0, 6));
            }
        }

        htmlDoc = parser.parseFromString(sectionOutputHtml, "text/html");
        tableRows = htmlDoc.querySelectorAll("tr");

        tableRows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            if (
                cells.length === 6 &&
                (cells[0].textContent ?? "").trim() === "Start Date" &&
                (cells[1].textContent ?? "").trim() === "Medication Item" &&
                (cells[2].textContent ?? "").trim() === "Dosage Instruction" &&
                (cells[3].textContent ?? "").trim() === "Quantity" &&
                (cells[4].textContent ?? "").trim() === "Last Issued Date" &&
                (cells[5].textContent ?? "").trim() === ""
            ) {
                row.remove();
            }
        });

        sectionOutputHtml = htmlDoc.body.innerHTML;

        sectionOutputHtml += "</table>";
        return sectionOutputHtml;
    }

    private formatRepeatEntry(entryLines: string[]): string {
        const entry = {
            startDate: entryLines[0],
            medicationItem: entryLines[1],
            dosageInstruction: entryLines[2],
            quantity: entryLines[3],
            lastIssuedDate: entryLines[4],
            comments: "",
        };

        const date = Date.parse(entry.startDate);
        if (isNaN(date)) {
            return "";
        }

        const lastIssuedDateText = this.isValidDate(entry.lastIssuedDate) ? entry.lastIssuedDate : "";

        return `<tr onclick="toggleRowSelection(this)">
            <td>${entry.startDate}</td>
            <td>${entry.medicationItem}</td>
            <td>${entry.dosageInstruction}</td>
            <td>${entry.quantity}</td>
            <td>${lastIssuedDateText}</td>
            <td>${entry.comments}</td>
          </tr>`;
    }

    private isValidDate(dateString: string): boolean {
        const regex = /^\d{2}([- ])(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\1\d{4}$/i;
        return regex.test(dateString);
    }

    // Copies the output as both HTML (so Word/Excel paste a formatted table) and
    // tab-separated plain text (so Excel/Notepad still get cell-aligned data).
    // Does not rely on DOM selection or alert(), both of which are blocked when
    // the app is hosted inside Teams.
    private copyPageContent(): void {
        const outputDiv = this.q<HTMLDivElement>("#output");
        const html = this.buildClipboardHtml(outputDiv);
        const text = this.buildClipboardText(outputDiv);

        this.writeClipboard(html, text)
            .then(() => {
                this.showCopyStatus(
                    "Copied. Paste (Ctrl+V) into Word, Excel or another application. The clipboard will be cleared in 10 seconds.",
                    false
                );
                setTimeout(() => this.clearClipboard(), 10000);
                return null;
            })
            .catch((err) => {
                console.error("Copy failed:", err);
                this.showCopyStatus("Failed to copy to the clipboard: " + String(err), true);
            });
    }

    private clearClipboard(): void {
        this.writeClipboard("", "").catch((err) => {
            console.error("Failed to clear clipboard:", err);
        });
    }

    private async writeClipboard(html: string, text: string): Promise<void> {
        if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        "text/html": new Blob([html], { type: "text/html" }),
                        "text/plain": new Blob([text], { type: "text/plain" }),
                    }),
                ]);
                return;
            } catch (err) {
                console.warn("navigator.clipboard.write failed, falling back to execCommand:", err);
            }
        }

        const onCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            e.clipboardData?.setData("text/html", html);
            e.clipboardData?.setData("text/plain", text);
        };
        const textarea = document.createElement("textarea");
        textarea.value = text || " ";
        textarea.setAttribute("readonly", "");
        textarea.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;user-select:text;";
        this.root.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.addEventListener("copy", onCopy, true);
        let successful = false;
        try {
            successful = document.execCommand("copy");
        } finally {
            document.removeEventListener("copy", onCopy, true);
            textarea.remove();
        }
        if (!successful) throw new Error("Clipboard access is not available in this environment.");
    }

    private buildClipboardHtml(source: HTMLElement): string {
        const clone = source.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("[onclick]").forEach((el) => el.removeAttribute("onclick"));

        const font = "font-family:Verdana,sans-serif;";
        clone.querySelectorAll<HTMLElement>("table").forEach((el) => {
            el.setAttribute("border", "1");
            el.setAttribute("cellspacing", "0");
            el.setAttribute("cellpadding", "6");
            el.style.cssText += `border-collapse:collapse;width:100%;${font}font-size:12px;`;
        });
        clone.querySelectorAll<HTMLElement>("th, td").forEach((el) => {
            el.style.cssText += `border:1px solid #999;padding:6px;text-align:left;vertical-align:top;${font}font-size:12px;`;
        });
        clone.querySelectorAll<HTMLElement>("th").forEach((el) => {
            el.style.cssText += "background-color:#f2f2f2;color:#333;font-weight:bold;";
        });
        clone.querySelectorAll<HTMLElement>("tr.selected td, tr.preselected td").forEach((el) => {
            el.style.cssText += "background-color:#e0e0e0;";
        });
        clone.querySelectorAll<HTMLElement>(".older-than-28-days, .older-than-28-days td").forEach((el) => {
            el.style.cssText += "background-color:#ffcccc;";
        });
        clone.querySelectorAll<HTMLElement>("h2").forEach((el) => {
            el.style.cssText += `${font}font-size:16px;margin:0 0 6px 0;`;
        });
        clone.querySelectorAll<HTMLElement>("p, pre, div").forEach((el) => {
            el.style.cssText += `${font}font-size:12px;`;
        });
        clone.querySelectorAll<HTMLElement>("pre, .dosage-info").forEach((el) => {
            el.style.cssText += "white-space:pre-wrap;";
        });

        return `<html><head><meta charset="utf-8"></head><body style="${font}">${clone.innerHTML}</body></html>`;
    }

    private buildClipboardText(source: HTMLElement): string {
        const cellText = (el: Element) => (el.textContent ?? "").replace(/\s+/g, " ").trim();
        const lines: string[] = [];
        source.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const t = (node.textContent ?? "").trim();
                if (t) lines.push(t);
                return;
            }
            if (!(node instanceof HTMLElement)) return;
            const tables = node.tagName === "TABLE" ? [node as HTMLTableElement] : Array.from(node.querySelectorAll("table"));
            if (tables.length === 0) {
                node.innerText
                    .split("\n")
                    .map((l) => l.trim())
                    .filter((l) => l)
                    .forEach((l) => lines.push(l));
                lines.push("");
                return;
            }
            tables.forEach((table) => {
                table.querySelectorAll("tr").forEach((row) => {
                    lines.push(Array.from(row.querySelectorAll("th, td")).map(cellText).join("\t"));
                });
                lines.push("");
            });
        });
        return lines.join("\r\n").trim();
    }

    private showCopyStatus(message: string, isError: boolean): void {
        const status = this.q<HTMLDivElement>("#copyStatus");
        status.textContent = message;
        status.classList.toggle("error", isError);
        status.style.display = "block";
        window.clearTimeout(this.copyStatusTimer);
        this.copyStatusTimer = window.setTimeout(() => {
            status.style.display = "none";
        }, 10000);
    }

    private showProcessedData(dataType: string): void {
        this.q<HTMLDivElement>("#inputSection").style.display = "none";
        this.q<HTMLDivElement>("#formattedData").style.display = "block";

        const buttonContainer = this.q<HTMLDivElement>("#buttonContainer");
        const buttons = buttonContainer.getElementsByTagName("button");

        for (const button of Array.from(buttons)) {
            if (
                dataType === "gp" ||
                button.innerText === "Print" ||
                button.innerText === "Copy Page Content" ||
                button.innerText === "Home"
            ) {
                button.style.display = "inline-block";
            } else {
                button.style.display = "none";
            }
        }
    }

    private toggleRowSelection(row: HTMLTableRowElement): void {
        if (row.classList.contains("preselected")) {
            row.classList.toggle("selected");
            if (!row.classList.contains("selected")) {
                row.classList.remove("preselected");
            }
        } else {
            row.classList.toggle("selected");
        }
    }

    private deleteSelectedRows(): void {
        const selectedRows = this.root.querySelectorAll(".selected");
        selectedRows.forEach(function (row) {
            row.parentNode?.removeChild(row);
        });
        this.updateEmptySections();
    }

    private updateEmptySections(): void {
        const table = this.root.querySelector<HTMLTableElement>("#medicationTable");
        if (!table) return; // Exit the function if the table doesn't exist

        const rows = table.querySelectorAll("tr");
        let acuteSection = false;
        let repeatSection = false;
        let acuteEmpty = true;
        let repeatEmpty = true;

        for (const currentRow of Array.from(rows)) {
            const firstCell = currentRow.cells[0];
            if ((firstCell.textContent ?? "").trim() === "Acute Medication") {
                acuteSection = true;
                repeatSection = false;
                continue;
            }
            if ((firstCell.textContent ?? "").trim() === "Repeat Medication") {
                acuteSection = false;
                repeatSection = true;
                continue;
            }
            if (acuteSection && !(firstCell.textContent ?? "").includes("No recent acute medications")) {
                acuteEmpty = false;
            }
            if (
                repeatSection &&
                !(firstCell.textContent ?? "").includes("No current repeat medications")
            ) {
                repeatEmpty = false;
            }
        }

        if (acuteEmpty) {
            const acuteMessageExists = Array.from(rows).some((row) =>
                (row.cells[0].textContent ?? "").includes("No recent acute medications")
            );
            if (!acuteMessageExists) {
                const acuteRow = table.insertRow(2);
                acuteRow.insertCell(0).innerHTML = "No recent acute medications";
                for (let i = 1; i < 3; i++) {
                    // Changed from 5 to 3
                    acuteRow.insertCell(i);
                }
            }
        }

        if (repeatEmpty) {
            const repeatMessageExists = Array.from(rows).some((row) =>
                (row.cells[0].textContent ?? "").includes("No current repeat medications")
            );
            if (!repeatMessageExists) {
                const repeatRow = table.insertRow(-1);
                repeatRow.insertCell(0).innerHTML = "No current repeat medications";
                for (let i = 1; i < 3; i++) {
                    // Changed from 5 to 3
                    repeatRow.insertCell(i);
                }
            }
        }
    }

    private resetSelection(): void {
        this.setOutputHtml(this.initialProcessedData);

        const rows = this.root.querySelectorAll("#output table tr");
        rows.forEach(function (row) {
            row.classList.remove("selected");
            if (row.classList.contains("preselected")) {
                row.classList.add("selected");
            }
        });

        this.checkEmptyTables();
    }

    private alphabetizeRepeatMedication(): void {
        const table = this.root.querySelector<HTMLTableElement>("#output table:last-of-type");
        if (!table) return;
        const rows = Array.from(table.querySelectorAll("tr"));

        const repeatHeaderIndex = rows.findIndex(
            (row) => (row.cells[0].textContent ?? "").trim() === "Repeat Medication"
        );

        if (repeatHeaderIndex === -1) return;

        const repeatRows = rows
            .slice(repeatHeaderIndex + 1)
            .filter((row) => row.cells.length > 1 && !row.cells[0].querySelector("strong"));

        repeatRows.sort((a, b) => {
            const medicationItemA = (a.cells[0].textContent ?? "").trim().toLowerCase();
            const medicationItemB = (b.cells[0].textContent ?? "").trim().toLowerCase();
            return medicationItemA.localeCompare(medicationItemB);
        });

        repeatRows.forEach((row) => row.parentNode?.removeChild(row));

        let insertPoint: HTMLTableRowElement = rows[repeatHeaderIndex];
        repeatRows.forEach((row) => {
            insertPoint.insertAdjacentElement("afterend", row);
            insertPoint = row;
        });
    }

    private goHome(): void {
        this.q<HTMLDivElement>("#inputSection").style.display = "block";
        this.q<HTMLDivElement>("#formattedData").style.display = "none";
        this.q<HTMLTextAreaElement>("#rawData").value = "";
        this.q<HTMLDivElement>("#copyStatus").style.display = "none";

        // Show the disclaimer footer
        this.q<HTMLDivElement>("#disclaimerFooter").style.display = "block";
    }

    private combineMedicationSections(acuteHtml: string, repeatHtml: string): string {
        const parser = new DOMParser();
        const acuteDoc = parser.parseFromString(acuteHtml, "text/html");
        const repeatDoc = parser.parseFromString(repeatHtml, "text/html");

        let combinedHtml = `
    <style>
        #medicationTable {
            width: 100%;
            table-layout: fixed;
        }
        #medicationTable th:nth-child(1),
        #medicationTable td:nth-child(1) { width: 25%; }
        #medicationTable th:nth-child(2),
        #medicationTable td:nth-child(2) { width: 40%; }
        #medicationTable th:nth-child(3),
        #medicationTable td:nth-child(3) { width: 35%; }
    </style>
    <table border='1' id='medicationTable'>
    <tr><th>Medication Item</th><th>Instructions</th><th>Patient Comments</th></tr>`;

        // Add Acute Medication section
        combinedHtml += "<tr><td><strong>Acute Medication</strong></td><td></td><td></td></tr>";
        const acuteRows = acuteDoc.querySelectorAll<HTMLTableRowElement>("tr:not(:first-child)");
        if (
            acuteRows.length === 0 ||
            (acuteRows.length === 1 &&
                (acuteRows[0].textContent ?? "").includes(
                    "No 'Acute Medication (Last 12 Months)' data is recorded for this patient."
                ))
        ) {
            combinedHtml += "<tr><td>No recent acute medications</td><td></td><td></td></tr>";
        } else {
            acuteRows.forEach((row) => {
                const cells = row.cells;
                if (cells.length >= 5) {
                    // Combine dosage, quantity, and issue date with semicolons
                    const instructions = `${this.highlightDosage(cells[2].innerHTML)}; ${
                        cells[3].innerHTML
                    }; ${cells[0].innerHTML}`;

                    combinedHtml += `<tr onclick="toggleRowSelection(this)" class="${row.className}">
                    <td>${cells[1].innerHTML}</td>
                    <td>${instructions}</td>
                    <td>${cells[4].innerHTML}</td>
                </tr>`;
                }
            });
        }

        // Add Repeat Medication section
        combinedHtml += "<tr><td><strong>Repeat Medication</strong></td><td></td><td></td></tr>";
        const repeatRows = repeatDoc.querySelectorAll<HTMLTableRowElement>("tr:not(:first-child)");
        if (
            repeatRows.length === 0 ||
            (repeatRows.length === 1 &&
                (repeatRows[0].textContent ?? "").includes(
                    "No 'Current Repeat Medication' data is recorded for this patient."
                ))
        ) {
            combinedHtml += "<tr><td>No current repeat medications</td><td></td><td></td></tr>";
        } else {
            repeatRows.forEach((row) => {
                const cells = row.cells;
                if (cells.length >= 6) {
                    const startDate = cells[0].innerHTML.trim();
                    const lastIssuedDate = cells[4].innerHTML.trim();
                    // Keep the statement but remove bold formatting
                    const issueDate =
                        lastIssuedDate && lastIssuedDate !== "Not Known"
                            ? lastIssuedDate
                            : `*Not Issued (recorded on ${startDate})*`;

                    // Combine dosage, quantity, and issue date with semicolons
                    const instructions = `${this.highlightDosage(cells[2].innerHTML)}; ${
                        cells[3].innerHTML
                    }; ${issueDate}`;

                    combinedHtml += `<tr onclick="toggleRowSelection(this)" class="${row.className}">
                    <td>${cells[1].innerHTML}</td>
                    <td>${instructions}</td>
                    <td>${cells[5].innerHTML}</td>
                </tr>`;
                }
            });
        }

        combinedHtml += "</table>";
        return combinedHtml;
    }

    private highlightDosage(text: string): string {
        const words = ["TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
        const wordsLower = words.map((word) => word.toLowerCase());
        const regex = new RegExp(
            `\\b(${wordsLower.join("|")})(?!\\s+(times|minute|minutes|hour|hours)\\b)`,
            "gi"
        );

        return text.replace(regex, (match) => {
            return `<span style="color: red;">${match}</span>`;
        });
    }

    private processData(): void {
        const rawData = this.q<HTMLTextAreaElement>("#rawData").value;
        const dataType = this.q<HTMLSelectElement>("#dataType").value;
        const patientInfo = this.extractPatientInfo(rawData);
        let outputHtml = "";

        outputHtml += `<div id="patientInfo">`;
        outputHtml += `<h2>Patient Information:</h2>`;
        outputHtml += `<p><strong>Name:</strong> ${patientInfo.surname}, ${patientInfo.firstName}</p>`;
        outputHtml += `<p><strong>NHS Number:</strong> ${patientInfo.nhsNumber}</p>`;
        outputHtml += `<p><strong>Date of Birth:</strong> ${patientInfo.dob}</p>`;
        if (patientInfo.dischargeDate) {
            outputHtml += `<p><strong>Discharge Date:</strong> ${patientInfo.dischargeDate}</p>`;
        }
        outputHtml += `</div>`;
        outputHtml += `<hr>`;

        if (dataType === "gp") {
            outputHtml += this.processAllergiesSection(rawData);
            const acuteHtml = this.processAcuteMedicationSection(rawData);
            const repeatHtml = this.processRepeatMedicationSection(rawData);
            outputHtml += this.combineMedicationSections(acuteHtml, repeatHtml);
        } else if (dataType === "discharge") {
            outputHtml += this.processDischargeSummary(rawData);
        }

        this.initialProcessedData = outputHtml;
        this.setOutputHtml(outputHtml);

        if (dataType === "gp") {
            this.updateEmptySections();
        }

        this.showProcessedData(dataType);

        // Hide the disclaimer footer
        this.q<HTMLDivElement>("#disclaimerFooter").style.display = "none";
    }

    private processDischargeSummary(rawData: string): string {
        const patientInfo = this.extractPatientInfo(rawData);
        const startIndex = rawData.indexOf("Medications Prescribed on Discharge");
        const endMarkers = [
            "Dose Changes:",
            "Medications Started in Hospital Comment:",
            "Medications Stopped in Hospital Comment:",
            "Take Home Medications Comment:",
            "Treatment recommendation (For GP):",
            "Information for the Community Pharmacy:",
            "TTO Completed by Ward Pharmacist?:",
            "Medications Authorised by:",
            "- Allergies",
        ];
        const endIndex = endMarkers.reduce((minIndex, marker) => {
            const index = rawData.indexOf(marker, startIndex);
            return index !== -1 && (index < minIndex || minIndex === -1) ? index : minIndex;
        }, -1);

        if (startIndex === -1 || endIndex === -1) {
            return "<p>Medication section not found in the discharge summary.</p>";
        }

        const medicationSection = rawData.substring(startIndex, endIndex).trim();
        const medications = medicationSection.split(/\n\s*\n/).slice(1); // Skip the header

        let outputHtml = `
        <div class="discharge-date">
            <p>Medication data taken from hospital discharge prepared on ${patientInfo.dischargeDate}</p>
        </div>
        <table>
            <tr>
                <th>Medication</th>
                <th>Dosage Information</th>
                <th>Patient Comments</th>
            </tr>
    `;

        medications.forEach((med) => {
            let processedName: string, dosageInfo: string;

            if (med.includes("[")) {
                const parts = med.split("],");
                const bracketMatch = med.match(/\[(.*?)\]/);
                processedName = bracketMatch ? bracketMatch[1] : parts[0];
                dosageInfo = parts[1] ? parts[1].trim() : "";
            } else {
                const commaIndex = med.indexOf(",");
                if (commaIndex !== -1) {
                    processedName = med.substring(0, commaIndex).trim();
                    dosageInfo = med.substring(commaIndex + 1).trim();
                } else {
                    processedName = med.trim();
                    dosageInfo = "";
                }
            }

            dosageInfo = this.formatDosageInfo(dosageInfo);

            outputHtml += `
            <tr>
                <td>${processedName}</td>
                <td class="dosage-info">${dosageInfo}</td>
                <td></td>
            </tr>
        `;
        });

        outputHtml += "</table>";

        // Add additional information
        const additionalInfo = this.extractAdditionalInfo(rawData, endIndex);
        if (additionalInfo) {
            outputHtml += `
            <div class="additional-info">
                <h3>Additional Information:</h3>
                <pre>${additionalInfo}</pre>
            </div>
        `;
        }

        return outputHtml;
    }

    private formatDosageInfo(dosageInfo: string): string {
        const lines = dosageInfo.split("\n");
        let formattedInfo = "";
        let inTaper = false;
        let taperInfo = "";

        for (const line of lines) {
            if (line.trim().startsWith("Dose")) {
                inTaper = true;
                taperInfo = "Taper Schedule:<br>" + line + "<br>";
            } else if (inTaper && line.trim().match(/^\d+/)) {
                taperInfo += line + "<br>";
            } else if (inTaper && line.trim() === "") {
                inTaper = false;
                formattedInfo += '<div class="taper-info">' + taperInfo + "</div>";
            } else {
                formattedInfo += line + "<br>";
            }
        }

        if (inTaper) {
            formattedInfo += '<div class="taper-info">' + taperInfo + "</div>";
        }

        return formattedInfo;
    }

    private extractAdditionalInfo(rawData: string, startIndex: number): string | null {
        const endMarkers = [
            "Dose Changes:",
            "Medications Started in Hospital Comment:",
            "Medications Stopped in Hospital Comment:",
            "Take Home Medications Comment:",
            "Treatment recommendation (For GP):",
            "Information for the Community Pharmacy:",
            "TTO Completed by Ward Pharmacist?:",
            "Medications Authorised by:",
            "- Allergies",
        ];

        const lastEndMarkerIndex = endMarkers.reduce((maxIndex, marker) => {
            const index = rawData.lastIndexOf(marker);
            return index > maxIndex ? index : maxIndex;
        }, -1);

        if (lastEndMarkerIndex === -1) {
            return null;
        }

        let additionalInfo = rawData.substring(startIndex, lastEndMarkerIndex).trim();

        endMarkers.forEach((marker) => {
            additionalInfo = additionalInfo.replace(new RegExp(marker, "g"), `<strong>${marker}</strong>`);
        });

        return additionalInfo;
    }

    // Print via a hidden iframe so the host Power App page is not disturbed.
    private printData(): void {
        const printContents = this.q<HTMLDivElement>("#output").innerHTML;
        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        document.body.appendChild(iframe);

        const doc = iframe.contentDocument;
        const win = iframe.contentWindow;
        if (!doc || !win) {
            document.body.removeChild(iframe);
            return;
        }

        doc.open();
        doc.write(`<!DOCTYPE html><html><head><title>Medication Data Processor</title>
            <style>
                body { font-family: Verdana, sans-serif; font-size: 18px; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f2f2f2; color: #333; font-weight: bold; }
                .selected { background-color: #e0e0e0; }
                .preselected { background-color: #d3d3d3; }
                .dosage-info { white-space: pre-wrap; }
                .additional-info pre { white-space: pre-wrap; font-family: Verdana, sans-serif; font-size: 14px; }
                .discharge-date { font-weight: bold; margin-bottom: 20px; }
                #patientInfo { margin-bottom: 20px; }
                #patientInfo h2 { font-size: 20px; margin-bottom: 10px; }
                #patientInfo p { margin: 5px 0; }
            </style></head><body>${printContents}</body></html>`);
        doc.close();

        win.focus();
        win.print();

        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    }

    private checkEmptyTables(): void {
        const tables = this.root.querySelectorAll<HTMLTableElement>("#output table");
        tables.forEach(function (table) {
            const rows = table.querySelectorAll("tr");
            if (rows.length === 1) {
                const fillerRow = document.createElement("tr");
                const firstRow = table.querySelector("tr");
                if (!firstRow) return;
                const headerCells = firstRow.cells;
                for (const _headerCell of Array.from(headerCells)) {
                    const fillerCell = document.createElement("td");
                    fillerCell.textContent = "";
                    fillerRow.appendChild(fillerCell);
                }
                table.appendChild(fillerRow);
            }
        });
    }
}
