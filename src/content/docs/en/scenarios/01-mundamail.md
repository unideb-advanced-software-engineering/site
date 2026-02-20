---
title: "01: MundaMail"
description: "Free mailbox for everyone."
---

## Background

> Based on the story of the films titled [Coming to America](https://en.wikipedia.org/wiki/Coming_to_America) and [Coming to America 2](https://en.wikipedia.org/wiki/Coming_2_America)

After the death of King Jaffe Jofer, his son Akeem took the throne of Zamunda. However, listening to the voice of the times, King Akeem decided to involve his daughter Meeka in the reign.

Meeka wants to use modern tools to bring prosperity to Zamunda. She recognized that the key to development is digital transformation: independent IT infrastructure and digital government, combined with the use of renewable energy sources and climate-friendly solutions.

This digital transformation program is called the Zamunda Digital Renaissance (ZDR).

### General requirements of the ZDR program

- Since this is a government program, it is very important that all projects are accompanied by documentation of sufficient quantity and quality.
- Zamunda is not a poor country, but it does not want to waste money unnecessarily: projects must be planned with economy in mind. Climate-friendly goals also require this!
- It should be noted that internet coverage is not perfect in certain areas of the country. Even where there is internet, there may be higher delays and lower bandwidths.

## Description

Zamunda would like to provide all its residents with a free email account. The reasons for this are as follows:

- All public services, whether higher education, healthcare, or even pensions, would use this for correspondence. This would make these public services faster and more economical.
- Nowadays, an email account is essential for success. At the same time, the vast majority of people's personal correspondence is handled by profit-oriented companies, in line with their own interests. Zamunda wants to provide a free alternative that has the interests of its citizens at heart.

### Real world example

Consider tarhely.gov.hu, but which can also be used for general emailing.

## Users

- All citizens of Zamunda, approximately 10 million people.
- Administrators in the Zamunda public administration.

## Requirements

- Data protection considerations are of paramount importance:
  - Data processed by the system must be stored within Zamunda's territory, and the system must be operated within Zamunda's territory.
  - Users' emails must be stored in encrypted form.
- Emails must be retained until the user initiates their deletion. In other words, potentially forever.
- An API must be provided through which various government agencies can send messages to users.
- Basic auditing capabilities must also be provided for certain messages sent by government agencies (i.e., not all of them):
  - Recording when a message is opened.
  - Recording the deletion of the message.
- Some messages from government agencies are personalized (such as those related to medical treatment), while others are mass messages (such as notifications of various deadlines).
- Support for IMAP and SMTP protocols.
- Web and mobile user interfaces.
- A web-based administration interface must be provided where public administration officials can register new users.
- In order for people to actually use the system and for it not to be just a government communication channel, it must offer a real alternative to popular service providers.

## Additions

- One of our long-term goals is to open up the API so that businesses can also send messages via MundaMail, bypassing email protocols. Think, for example, of parcel delivery services (like UPS or FedEx, but from Zamunda).
- Do not overthink email protocols.