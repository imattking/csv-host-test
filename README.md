
# Custom Build for the UGA Circularity Informatics Lab

Re: Circularity Assessment Protocol(CAP) Reports

## Purpose :
To implement data visualizations for comparison & analysis of CAP data in the dashbaord of an online portal to be shared with clients & the scientific community

***

#### Phase I :
- Create .csv assets and make accessible via content delivery network (i.e. jsdelivr , github, etc.)
- Import .csv file data via asynchronous fetch request

#### Phase II : 
- Make appropriate use of this data in order to display it in the DOM
    - Render .csv text in dynamic data visualizatons via the HighCharts API
    - Convert remaining .csv text into HTML tables for static presentation of alternate datasets
- Render results in the DOM dynamically as each of the datasets in question is pulled from the CMS

#### Phase III : 
- Integrate both types of data visulations into a dynmic search & filtering interface with active tagging enabled

