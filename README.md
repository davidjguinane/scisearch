# README #

This README document contains and overview of the Scisearch application the steps required to isntall the SciSearch Application and Development Environement up and running.

**Overview**

SciSearch is a web application that guides students to specialised higher education and attracts both international acadmeics and businesses to easily find facilities and equipment in Queensland education centres that allows them to stay on the cutting edge of technology.

![](images/image1.png?raw=true)

It is built using the API to [Science capability directory](https://data.qld.gov.au/dataset/science-capability-directory) provided by the Queensland Government. 

Users select from the dropdown to query the API and SciSearch filters research facilities that meet the search requirements. 

![](images/image3.png?raw=true)

Exploring the facility will provide a detailed view of the facilitity, including address, website, an overview and a lsit of major facilities and equipment. 

![](images/image4.png?raw=true)

**Version**

Version: Development

**Edit the README**

Found an error? Something need updating? Edit the README using [Markdown](https://bitbucket.org/tutorials/markdowndemo).

## SciSearch Development Set Up ##

### Dependencies ###

#### Setup a Virtual Environement - virtualenv ####

Install virtualenv with the following command:

	$ pip install virtualenv

Create a `/scisearch` folder in desired directory:
	
	$ mkdir scisearch
	$ cd scisearch
	$ virtualenv --no-site-packages <envname>

Activate virtualenv:

Unix:

	$ source u-env/bin/activate    

Windows:

	$ u-env\scripts\activate

You should now see (<envname>) before your prompt, (<envname>)$, indicating that you're running within the 'u-env' virtualenv.
To exit the virtualenv, type the following command:

	$ deactivate

Then reactivate when you're ready to work again.

#### Using Package Management to install Dependencies ####

Navigate to the directory that contains `requirements.txt`, and run:

	$ pip install -r requirements.txt 

### Who do I talk to? ###

The repository owner is David Guinane. Contact david.j.guinanee@gmail.com. The secondary contact is Sam Gorle. Contact xxx.@mail.com 

### Install initial data using fixtures ###

	$ python manage.py loadata query/fixtures/<fixturename>.json --settings=query.settings.dev

