# Project Tasks Distribution - 3 Team Members

## Overview
This document outlines the distribution of tasks across 3 team members for the rental equipment project. Each person is assigned a feature branch and specific tasks.

---

## **Person 1: Backend & Data Architecture**
**Branch:** `feature/person1-categories-weight`  
**Focus:** Equipment categories and weight information

### Categories Management (4 tasks)
- [ ] List all equipment categories (tents, backpacks, shoes, poles, stoves, headlamps, gps)
- [ ] Design category display in UI (menu or section in catalog)
- [ ] Link each material to its category in data model
- [ ] Test category display on catalog page

### Weight Information (5 tasks)
- [ ] Add "weight" field to Equipment interface/data
- [ ] Input weight value for each equipment item (in kg)
- [ ] Define unit of measurement (kg as standard)
- [ ] Display weight on equipment card or product detail page
- [ ] Verify consistency of weight values across all items

**Commits to make:**
```
feat(categories): add equipment categories list
feat(categories): implement category display component
feat(categories): link materials to categories
feat(weight): add weight field to equipment data
feat(weight): display weight on product cards
```

---

## **Person 2: Logic & User Experience**
**Branch:** `feature/person2-filters-conditions`  
**Focus:** Filtering system and equipment condition states

### Filtering System (4 tasks)
- [ ] Define filter criteria (by type/category, availability, price range, etc.)
- [ ] Create filter component (checkbox/button/menu style)
- [ ] Implement filtering logic in EquipmentPage component
- [ ] Update catalog display after filtering applied

### Equipment Condition (4 tasks)
- [ ] Define condition statuses (new, good/used, worn/damaged)
- [ ] Associate condition status with each equipment item
- [ ] Display condition clearly (badge with color coding or text label)
- [ ] Test user understanding of condition states

**Commits to make:**
```
feat(filters): define filter criteria
feat(filters): create filter component UI
feat(filters): implement filter logic
feat(filters): update catalog display with filtered results
feat(conditions): add condition field to equipment
feat(conditions): display equipment condition badge
feat(conditions): test condition clarity
```

---

## **Person 3: Content & Visual Design**
**Branch:** `feature/person3-photos-descriptions`  
**Focus:** Product images and detailed descriptions

### Photos/Images (5 tasks)
- [ ] Define photo format and optimal size (responsive design)
- [ ] Add "photos" or "image" field to Equipment data model
- [ ] Import/source photos for all equipment items
- [ ] Implement photo display in catalog and product cards
- [ ] Test image display across different screen sizes (mobile, tablet, desktop)

### Descriptions (4 tasks)
- [ ] Define expected description content (specs, features, use cases, etc.)
- [ ] Add "description" field to Equipment data model
- [ ] Write clear and concise descriptions for each equipment (50-150 words recommended)
- [ ] Display description on equipment detail page
- [ ] Verify text readability and clarity

**Commits to make:**
```
feat(photos): define image specifications
feat(photos): add image field to equipment data
feat(photos): import equipment photos
feat(photos): implement photo display component
feat(photos): test responsive image display
feat(descriptions): add description field to equipment
feat(descriptions): write equipment descriptions
feat(descriptions): display descriptions on detail page
```

---

## **GitHub Workflow for Each Team Member**

### Step 1: Create Your Feature Branch
```bash
git checkout -b feature/your-name-your-feature
```

### Step 2: Work & Commit Regularly
```bash
# Make changes
git add .
git commit -m "feat(feature-name): specific change description"
git commit -m "feat(feature-name): another change"
```

### Step 3: Push to Remote
```bash
git push origin feature/your-name-your-feature
```

### Step 4: Create Pull Request on GitHub
- Go to GitHub repository
- Click "New Pull Request"
- Select your branch and add description:
  ```
  ## Description
  Completed tasks for [feature name]
  
  ## Tasks Completed
  - [x] Task 1
  - [x] Task 2
  
  ## Type of Change
  - [x] New feature
  - [ ] Bug fix
  
  ## Testing
  Tested on [browser/device]
  ```

### Step 5: Code Review & Merge
- Team lead reviews code
- Approve and merge to `main` branch
- Delete feature branch

---

## **Conflict Resolution**

If working on overlapping areas:
1. **Communicate early** - mention in team chat
2. **Coordinate commits** - decide who commits first
3. **Use rebase** - keep history clean:
   ```bash
   git fetch origin
   git rebase origin/main
   git push origin feature/your-branch --force-with-lease
   ```

---

## **Merge Checklist**

Before merging PR, verify:
- [ ] All tests pass (`npm run dev` works without errors)
- [ ] Code follows project style
- [ ] No conflicting changes with other branches
- [ ] Description of changes is clear
- [ ] All assigned tasks are completed

---

## **Progress Tracking**

### Person 1 Progress
- Categories: 0/4 complete
- Weight: 0/5 complete
- **Total: 0/9**

### Person 2 Progress
- Filters: 0/4 complete
- Conditions: 0/4 complete
- **Total: 0/8**

### Person 3 Progress
- Photos: 0/5 complete
- Descriptions: 0/4 complete
- **Total: 0/9**

---

## **Timeline Suggestion**

- **Week 1:** Complete core implementation
- **Week 2:** Testing & refinements
- **Week 3:** Integration & final review

Update this document as you complete tasks!
