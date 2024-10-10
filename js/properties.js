import { PropertiesData, SubjectName } from './data.js'; 

function Properties(SubName, Percentage) {
    this.SubName = SubName;
    this.Percentage = Percentage;
}

const Subject = [{ name: '', html: '', percentage: null }];
const PropertyText = document.querySelector('.propert_txt');
const AddButton = document.querySelector('.add_btn');
const PropContainer = document.querySelector('.properties');
const nextButton = document.querySelector('.nxt_btn_btn');

AddButton.addEventListener('click', () => {
    const prop = PropertyText.value;
    if (prop) {
        const html = renderSubs(prop, Subject.length);
        Subject.push({ name: prop, html: html, percentage: null });
        generateHTML();
        attachChangeEvent(); // Attach event listener to new dropdowns
        PropertyText.value = '';
    }
    disableNext(); // Call to update the button state after adding a new subject
});

// Update renderSubs to include a delete button
const renderSubs = (name, index) => {
    return ` 
        <div class="subject-container" data-index="${index}">
            <div class="subject_name">${name}</div>
            <select name="options" class="percentage">
                <option value="0.10">10%</option>
                <option value="0.15">15%</option>
                <option value="0.20">20%</option>
                <option value="0.25">25%</option>
                <option value="0.30">30%</option>
                <option value="0.35">35%</option>
                <option value="0.40">40%</option>
                <option value="0.45">45%</option>
                <option value="0.50">50%</option>
                <option value="0.55">55%</option>
                <option value="0.60">60%</option>
                <option value="0.65">65%</option>
                <option value="0.70">70%</option>
                <option value="0.75">75%</option>
                <option value="0.80">80%</option>
                <option value="0.85">85%</option>
                <option value="0.90">90%</option>
                <option value="0.95">95%</option>
                <option value="1.00">100%</option>
            </select>
            <button class="delete_btn">Delete</button>
        </div>`;
};

const generateHTML = () => {
    let subsHtml = '';
    Subject.forEach((sub) => {
        subsHtml += sub.html;
    });
    PropContainer.innerHTML = subsHtml;
};

const disableNext = () => {
    if (!checkPercentage()) {
        nextButton.style.cursor = 'not-allowed';
        return false; // Return false if not valid
    } else {
        nextButton.style.cursor = 'pointer';
        return true; // Return true if valid
    }
};

const checkPercentage = () => {
    const percentages = document.querySelectorAll('.percentage');
    let total = 0;
    let isValid = false;
    percentages.forEach((perc) => {
        total += parseFloat(perc.value);
    });

    percentages.forEach((perc) => {
        if (total > 1 || total < 1) {
            perc.style.border = `1px solid red`;
        } else {
            perc.style.border = `1px solid black`;
            isValid = true;
        }
    });
    return isValid;
};

// Function to delete a subject
const deleteSubject = (index) => {
    Subject.splice(index, 1); // Remove the subject from the array
    generateHTML(); // Re-render the HTML
    updateIndexes(); // Update the indexes for remaining subjects
    attachChangeEvent(); // Re-attach event listeners
    disableNext(); // Update button state
};

// Update the indexes for remaining subjects after deletion
const updateIndexes = () => {
    const subjectContainers = document.querySelectorAll('.subject-container');
    subjectContainers.forEach((container, index) => {
        container.setAttribute('data-index', index); // Update data-index
    });
};

// Attach change event to the percentage dropdowns and delete buttons
const attachChangeEvent = () => {
    const percentages = document.querySelectorAll('.percentage');
    percentages.forEach((element) => {
        element.addEventListener('change', () => {
            checkPercentage();
            disableNext();
        });
    });

    const deleteButtons = document.querySelectorAll('.delete_btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('.subject-container').dataset.index); // Get the index from data attribute
            deleteSubject(index); // Call delete function
        });
    });
};

nextButton.addEventListener('click', () => {
    if (disableNext()) {
        PropertiesData.length = 0; // Reset the PropertiesData array
        
        // Create Properties instances and push to PropertiesData
        Subject.forEach((sub, index) => {
            const percentageDropdown = PropContainer.querySelector(`.subject-container[data-index="${index}"] .percentage`);
            
            // Check if percentageDropdown exists
            if (percentageDropdown) {
                const percentageValue = parseFloat(percentageDropdown.value);
                const property = new Properties(sub.name, percentageValue); // Create new Properties instance
                PropertiesData.push(property); // Add to PropertiesData

                const SubjectText = document.querySelector('.subject_txt');
                SubjectName.push(SubjectText.value); // Now this works correctly
                console.log(SubjectName);

                document.body.innerHTML = ``
            } else {
                console.error(`Dropdown not found for subject: ${sub.name}`);
            }
        });
        
        console.log(PropertiesData); // Check the results in the console
    } else {
        alert('Properties percentage must be equal to 100%');
    }


});

disableNext();

export default Properties;
