// Anglické preklady obsahových dát. Kľúčom je id položky (alebo poradie pri poliach bez id).
// Polia, ktoré tu nie sú (dátumy, čísla, zdroje), sa preberajú zo slovenskej verzie.

/* ---------- Časová os ---------- */
export const enTimeline: Record<string, { title: string; text: string; photoAlt?: string; photoCredit?: string }> = {
  e0909: { title: 'Danube at Devín at its low', text: 'The Danube at Devín fell to 145 cm, a level exceeded on 330 days a year. It began rising from this day. The starting situation was drought, not flood.' },
  e1009: { title: 'SK-Alert warning system not yet working', text: 'The Ministry of Interior announced it wanted to launch the procurement of a warning system (originally “Reverse 112”) by the end of September 2024. It was originally meant to work from summer 2022. Warning SMS or cell broadcast were therefore not available during the flood.' },
  e1209a: { title: 'Crisis staff of the Ministry of Interior', text: 'Ahead of the expected heavy rain, a crisis staff met with the ministers of interior and environment, the heads of the Fire and Rescue Service and the Police, and the director of the ministry’s crisis management section. Equipment was concentrated mainly at the Fire and Rescue Brigade in Malacky. The Armed Forces were ready to help. The staff decided to declare flood activity level II that same day and to start installing barriers, mainly in villages along the Morava. Further preventive measures were to be decided by the central flood staff.' },
  e1209b: { title: 'Rivers start rising on the Morava and Danube', text: 'A sharp rise began on the Slovak section of the Morava on 12 Sep. On the Danube at Devín the level rose sharply from the afternoon, and 24 hours later also at Štúrovo. Low-pressure system “Boris” moved from the Adriatic to the Carpathians between 13 and 15 Sep.' },
  e1309a: { title: 'Central Flood Commission', text: 'The commission met in Bratislava. Water managers and firefighters were tasked with finding places where the Morava could be released in a controlled way away from settlements. 650 t of sand and mobile barriers were available. About 320 soldiers were on standby within 1 hour and more than 800 within 3 hours. The forecast then expected the Morava to peak on Monday at 639 cm and the Danube to reach at most flood activity level 2.' },
  e1309b: { title: 'Copernicus EMS activated (EMSR757)', text: 'The ministry’s crisis management section requested satellite flood mapping from the Copernicus EMS service. Two areas were mapped, Morava (AoI01) and Myjava (AoI02). The flooded area detected in both together was 10,330 ha.' },
  e1309c: { title: 'First level-3 hydrological warnings', text: 'SHMÚ issued level-3 warnings for the districts of Myjava (from 12:00), Senica (from 18:00) and Skalica (from 20:00). The mayor of Myjava declared flood activity level 3 at 13:30, the mayor of Senica at 14:00.' },
  e1409: { title: 'Level-3 warning for Bratislava', text: 'A level-3 warning was valid for Malacky district from 10:00 and for Bratislava from 20:00, about 3.5 days before the Danube peaked in Bratislava. Pezinok, Trnava, Hlohovec and Piešťany districts had a level-2 warning from 06:00.' },
  e1509a: { title: 'Rainfall peak: Pernek 159 mm in a day', text: 'The highest daily rainfall was measured in Pernek (159 mm, total to 10:00). Over 12–16 Sep it received 386 mm. Streams of the Little Carpathians and Záhorie peaked that day (Chvojnica, Teplica, Stupávka, Blatina, Parná), and in Kysuce the Kysuca at Turzovka and Čadca reached a 50-year flow.' },
  e1509b: { title: 'Level 3 and emergency situation in Bratislava Region', text: 'At 10:00 the head of the Bratislava District Office declared flood activity level III for all districts of the Bratislava Region. According to municipal notices, an emergency situation also applied to the whole region from 10:00. The heads of the Skalica (04:00), Malacky (06:00) and Senica (06:00) district offices declared level 3 for their districts.' },
  e1509c: { title: 'Stupava and Čadca prepare for evacuation', text: 'Stupava declared level 3 at midnight and asked residents to pack an emergency bag. Čadca declared the highest flood activity level and prepared the sports hall as shelter for a possible evacuation. Bridges in the town were also at risk. In Bratislava, trams stopped because of damaged overhead lines.' },
  e1609a: { title: 'Malina at Jakubov: 100-year flow', text: 'The peak flow of the Malina at Jakubov reached 24.96 m³/s, a 100-year flow. According to SHMÚ, the situation was influenced by a breach of the stream’s dike.' },
  e1609b: { title: 'Extraordinary government meeting', text: 'The government discussed the floods at its meeting on Monday 16 Sep. According to Denník N, the labour ministry announced aid of up to €1,500 per household and €15,000 per municipality. Denník N also criticised that the prime minister was barely visible in public over the weekend.' },
  e1609c: { title: 'Devínska Nová Ves: dispute over a pumping station', text: 'Denník N reported a problem with a pumping station and the late installation of mobile barriers in Devínska Nová Ves. The mayor reportedly learned about the failure from firefighters. The minister disputed that anything had failed. The claim rests on a single media source.' },
  e1709a: { title: 'First Danube peak in Bratislava: 970 cm', text: 'The Danube at Devín peaked at 03:00 at 905 cm (9,305 m³/s, 20-year flow) and in Bratislava at 10:45 at 970 cm. The Morava at Moravský Svätý Ján peaked at 15:30 (1,059 m³/s, 10-year flow). According to SHMÚ, level-3 warnings were in force for all districts in the Morava and Danube basins.', photoAlt: 'Flooded Danube by the Old Bridge in Bratislava, castle and SNP Bridge in the background, 17 Sep 2024', photoCredit: 'Photo: Akkbula, CC BY-SA 4.0' },
  e1709b: { title: 'Army and firefighters in the field', text: 'From Monday to Tuesday morning, firefighters in Slovakia had 153 call-outs, 75 of them in the Bratislava Region and 43 in the Trnava Region. 141 professional firefighters and 316 volunteer firefighters were deployed. Soldiers carried residents of Devín and Devínska Nová Ves and supplied Chľaba and Kováčov. Chľaba, cut off by road for about four days, was under an emergency situation.' },
  e1809a: { title: 'Maximum: Danube in Bratislava 985 cm', text: 'The second flood wave from Austria merged with water from the Morava. Devín peaked at 06:00 (913 cm, 9,441 m³/s), Bratislava at 13:30 at 985 cm, the maximum of this flood. Backwater from the Danube raised the Morava at Devínska Nová Ves to 839 cm.', photoAlt: 'Flooded Danube by Eurovea in Bratislava, 18 Sep 2024', photoCredit: 'Photo: Patrik Kunec, CC BY-SA 4.0' },
  e1809b: { title: 'Devín cut off', text: 'After a crisis staff meeting, the president of the Bratislava Self-Governing Region said Devín was still cut off and residents of Devínska Nová Ves could leave only by army shuttle. Groundwater was rising and the barriers were leaking. Keeping supplies flowing was the priority.' },
  e1909: { title: 'The wave moves on: Medveďov', text: 'Below the Gabčíkovo waterworks, the Danube at Medveďov peaked at 932 cm with 9,272 m³/s. This was a 20- to 50-year flow, the most significant on the Slovak Danube.' },
  e2009: { title: 'Peaks at Komárno and Štúrovo, backwater on the Váh', text: 'The Danube peaked at Komárno at 04:15 (8,357 m³/s) and at Štúrovo at 11:15 (8,493 m³/s). Backwater on the Váh exceeded level 2 at Kolárovo. The mayor of Komárno declared level 3 at 08:00.' },
  e2009b: { title: 'EU funds announced', text: 'After a meeting in Wrocław, the prime minister said Slovakia could receive about €1 billion of the €10 billion in EU cohesion funds for floods. This was a preliminary statement, not an allocation decision.' },
  e2509: { title: 'End of warnings', text: 'The last hydrological warning in the Morava basin, level 1 for Malacky district, ended on 25 Sep at 03:10. In September SHMÚ issued 54 hydrological warnings in the Danube, Morava, Nitra and lower Váh basins and another 21 in the upper and middle Váh basin.' },
  e2105: { title: 'Government approves the flood report', text: 'The government approved the environment ministry’s report on floods from July to December 2024. Damage exceeded €7.66 million and more than €10.82 million was approved to reimburse costs. About eight months had passed since the flood.' },
  e2705: { title: 'EU Solidarity Fund proposal', text: 'The European Commission proposed €280 million from the EU Solidarity Fund for countries hit by floods in 2024, including Slovakia.' },
}

export const enTlCats = { hydro: 'Hydrology', vystraha: 'Warnings & flood levels', riadenie: 'Crisis management', zasah: 'Response & protection', obnova: 'Recovery & funding' }

/* ---------- Aktéri ---------- */
export const enTiers = {
  strategic: { label: 'Strategic level', hint: 'government and central bodies' },
  expert: { label: 'Expert & information bodies', hint: 'forecasting, monitoring, rivers' },
  regional: { label: 'Regional level', hint: 'regional district office, self-governing region' },
  local: { label: 'District & local level', hint: 'district offices, municipalities' },
  response: { label: 'Response units', hint: 'integrated rescue system and support' },
}

export const enActors: Record<string, { name: string; short: string; role: string; legal: string[]; documented: string[] }> = {
  vlada: {
    name: 'Government of the Slovak Republic', short: 'Government',
    role: 'The highest executive body. In a large-scale event it coordinates the response and provides funding.',
    legal: ['Declares and revokes an emergency situation if the threatened or affected area exceeds one region.', 'Governs the state in crisis situations outside war; its advisory bodies are the Security Council and the central crisis staff.'],
    documented: ['Extraordinary government meeting on the floods on Monday 16 Sep 2024; aid to households and municipalities announced.', 'No nationwide emergency situation was declared. According to the Interior Ministry’s monitoring centre (CMRS), 34 flood-related emergency situations were declared in 2024 (May to September), in the districts of Snina, Nitra, Poprad, Malacky, Skalica and in the Bratislava Region.', 'On 21 May 2025 it approved the report on floods in the second half of 2024 and reimbursement of more than €10.82 million.'],
  },
  mzp: {
    name: 'Ministry of Environment and the Central Flood Commission', short: 'Environment Ministry / Flood Commission',
    role: 'Central authority for flood protection. The minister chairs the Central Flood Commission.',
    legal: ['Declares and revokes flood activity levels II and III on border river sections or for areas larger than a region, runs the Central Flood Commission and the flood forecasting service through SHMÚ.', 'The Central Flood Commission sets up a technical staff, led by a ministry representative with the president of the Fire and Rescue Service as deputy.'],
    documented: ['The commission met on 13 Sep 2024. It ordered a search for places for a controlled release of the Morava; 650 t of sand and mobile barriers were available.', 'It submitted to the government the report on floods in the second half of 2024.'],
  },
  minv: {
    name: 'Ministry of Interior – Crisis Management Section', short: 'Interior Ministry',
    role: 'Central authority for civil protection and the integrated rescue system.',
    legal: ['Runs the flood warning service together with district offices and municipalities, using the civil protection information system.', 'Coordinates testing of public warning systems.'],
    documented: ['Crisis staff on 12 Sep 2024 with the ministers of interior and environment and the heads of the fire service and police; contact with mayors, the association of municipalities and regions.', 'On 13 Sep the crisis management section activated Copernicus EMS satellite mapping (EMSR757).', 'In September 2024 the SK-Alert warning system was only being prepared for procurement.'],
  },
  shmu: {
    name: 'Slovak Hydrometeorological Institute', short: 'SHMÚ',
    role: 'State hydrological and meteorological service. Runs the flood forecasting service.',
    legal: ['Runs the flood forecasting service, issues hydrological warnings and informs flood protection authorities.'],
    documented: ['In September 2024 it issued 54 hydrological warnings (12 of level 3) in the Danube, Morava, Nitra and lower Váh basins and another 21 in the upper and middle Váh basin.', 'It continuously issued extraordinary hydrological bulletins for flood protection authorities and published water levels online.', 'Denník N pointed out differences between the minister’s public statements and SHMÚ forecasts.'],
  },
  svp: {
    name: 'Slovak Water Management Enterprise', short: 'SVP',
    role: 'Manages major rivers and flood defences (dikes, mobile walls, pumping stations).',
    legal: ['Organises and, during floods, runs the flood reporting service, carries out protective works under flood plans and runs a non-stop service from flood activity level II.'],
    documented: ['After the Central Flood Commission on 13 Sep its director general commented on the search for places for a controlled release of the Morava (no place had been chosen yet).', 'Pumping station in Devínska Nová Ves: Denník N reported a failure, the minister disputed it. The claim is contested.'],
  },
  'ou-kraj': {
    name: 'District office in the regional capital', short: 'Regional district office',
    role: 'State administration body for civil protection and crisis management in the region.',
    legal: ['Declares and revokes an emergency situation in the region if it exceeds one district; directs rescue work and plans evacuation if they exceed a district.', 'Its head declares flood activity levels II and III on rivers that cross several districts of the region.'],
    documented: ['On 15 Sep 2024 at 10:00 the head of the Bratislava District Office declared flood activity level III for all districts of the Bratislava Region. An emergency situation was declared for the whole region the same day.'],
  },
  vuc: {
    name: 'Self-governing region', short: 'Self-governing region',
    role: 'Regional self-government. Cooperates on civil protection and is responsible for its facilities, such as social care homes and regional roads.',
    legal: ['Carries out civil protection tasks within the competence of the self-governing region.', 'Has flood protection duties (e.g. for roads and facilities it manages).'],
    documented: ['On 18 Sep, after a crisis staff meeting, the president of the Bratislava region reported that Devín was cut off and mobile barriers were leaking.'],
  },
  ou: {
    name: 'District office', short: 'District office',
    role: 'Directs civil protection and rescue work in the district and chairs the district flood commission.',
    legal: ['Declares and revokes an emergency situation in its district, runs the civil protection information system and rescue work; informs municipalities, police, fire service and armed forces.', 'Its head declares flood activity levels II and III for several municipalities or the whole district; during level III it can set up an operational group.'],
    documented: ['On 15 Sep the heads of the Skalica (04:00), Malacky (06:00) and Senica (06:00) district offices declared level 3 for their whole districts.', 'On 16 Sep the head of the Dunajská Streda District Office declared level 2 for the municipality of Okoč.'],
  },
  obec: {
    name: 'Municipality / town', short: 'Municipalities',
    role: 'Closest to residents. Warns people, organises evacuation, emergency shelter and supplies, chairs the municipal flood commission.',
    legal: ['Plans, declares, directs and secures evacuation, provides emergency shelter and supplies; declares an emergency situation and sets rules for daily life.', 'The mayor declares and revokes flood activity levels II and III for the municipality.'],
    documented: ['According to SHMÚ flood reports, dozens of municipalities declared level 3, for example Myjava and Senica on 13 Sep, Stupava at midnight on 15 Sep, Komárno on 20 Sep and Patince on 21 Sep.', 'Čadca prepared a sports hall for a possible evacuation and Stupava asked residents to pack emergency bags.', 'Chľaba, cut off by road for about four days, had an emergency situation declared.'],
  },
  hazz: {
    name: 'Fire and Rescue Service', short: 'Fire service',
    role: 'Core part of the integrated rescue system. Carries out rescue work, pumping and building flood barriers.',
    legal: ['Carries out rescue work in natural disasters and other emergencies.'],
    documented: ['From 16 Sep to the morning of 17 Sep: 153 call-outs, 75 in the Bratislava and 43 in the Trnava region, with 141 professional firefighters deployed.', 'Equipment was concentrated at the Fire and Rescue Brigade in Malacky.'],
  },
  dhz: {
    name: 'Volunteer fire brigades', short: 'Volunteer firefighters',
    role: 'Municipal fire units, often first on the scene in local floods.',
    legal: ['May be included among other rescue units of the integrated rescue system.'],
    documented: ['In the same period (16–17 Sep), 316 volunteer firefighters were deployed.', 'According to Denník N, 879 volunteer firefighters were deployed in the Trnava Region alone on Sunday 15 Sep.'],
  },
  pz: {
    name: 'Police Force', short: 'Police',
    role: 'Public order, traffic control, road closures and protection of evacuated property.',
    legal: ['Cooperates within the integrated rescue system in handling emergencies.'],
    documented: ['Police in the Bratislava and Trnava regions were ready to direct traffic on flooded roads and monitor buildings in case of forced evacuation.', 'The police president attended the crisis staff on 12 Sep.'],
  },
  zzs: {
    name: 'Emergency medical service', short: 'Ambulance service',
    role: 'Core part of the integrated rescue system. Provides pre-hospital emergency care.',
    legal: ['A core unit of the integrated rescue system, dispatched by its coordination centre.'],
    documented: [],
  },
  ossr: {
    name: 'Armed Forces of the Slovak Republic', short: 'Armed forces',
    role: 'Support forces. Provide transport, logistics and people to reinforce dikes when civilian capacity is not enough.',
    legal: ['The district office informs the armed forces of an emergency situation; they may be used in rescue work.'],
    documented: ['On 13 Sep about 320 soldiers were on standby within 1 hour and more than 800 within 3 hours.', 'Soldiers carried residents of Devín and Devínska Nová Ves and supplied Chľaba and Kováčov. In Holíč, 20 soldiers helped remove flood barriers.'],
  },
}

/* ---------- Proces varovania a evakuácie ---------- */
export const enSteps: Record<string, { title: string; short: string; what: string; who: string; example?: string }> = {
  monitoring: { title: 'Monitoring', short: 'rainfall, water levels, forecasts', what: 'Continuous monitoring of rainfall, water levels and flows, and hydrological forecasting. It includes data from upstream parts of the basin abroad, such as Austria and Czechia, where the water of the Danube and Morava comes from.', who: 'SHMÚ (flood forecasting service), river managers (SVP), municipal flood patrols.', example: 'SHMÚ followed the Danube at Devín from its low of 145 cm (9 Sep). It also evaluated rainfall in the Bavarian and Austrian parts of the basin.' },
  riziko: { title: 'Risk assessment', short: 'warnings and flood activity levels', what: 'Comparing the forecast with water levels set for flood activity levels and issuing hydrological warnings for districts. Level III means the greatest flood threat.', who: 'SHMÚ (warnings), flood commissions, mayors and heads of district offices (declaring levels).', example: 'SHMÚ issued a level-3 warning for Bratislava district on 14 Sep at 20:00. The Danube peaked there on 18 Sep at 13:30.' },
  varovanie: { title: 'Warning the public', short: 'sirens, media, local channels', what: 'The public is warned with the “OHROZENIE VODOU” (water threat) signal, a six-minute steady siren tone, followed by spoken information in the mass media. The flood reporting service also notifies authorities, the fire service and municipalities.', who: 'Municipalities, district offices, Interior Ministry (civil protection information system), flood reporting service.', example: 'According to Denník N, Čadca had warned residents on Facebook as early as Thursday 12 Sep. The national SK-Alert system was not yet running.' },
  rozhodnutie: { title: 'Deciding on measures', short: 'flood levels, emergency situation, crisis staff', what: 'Declaring flood activity level II or III and, if needed, an emergency situation. This allows forces from the whole area to be used, evacuation to be ordered and emergency supplies and shelter to be provided.', who: 'Mayor, head of district office, head of the regional district office, government (above regional level).', example: 'On 15 Sep at 10:00 level III was declared for all districts of the Bratislava Region, and an emergency situation for the whole region the same day.' },
  evakuacia: { title: 'Evacuation and other protective measures', short: 'moving people, barriers, closures', what: 'Evacuation means moving threatened people, animals and property out of an area. It can be short-term (return within 72 hours) or long-term. It is announced through the mass media. At the same time, flood protection and rescue work is carried out, such as building barriers, pumping and closing roads.', who: 'Municipality (evacuation on its territory), district and regional offices (if it exceeds a municipality or district), fire service, police, armed forces.', example: 'Stupava asked residents to pack emergency bags and Čadca prepared a sports hall. The sources do not show whether, or how widely, evacuation actually took place in these towns.' },
  nudzove: { title: 'Emergency provision', short: 'shelter, water, food, access', what: 'Emergency shelter means temporary housing for people at risk. Emergency supply covers minimum food, drinking water and basic needs including electricity, heating and health care.', who: 'Municipality, district office, armed forces and humanitarian organisations.', example: 'The army supplied Chľaba, cut off for about four days. Social care homes in Chľaba and nearby Kováčov had about 270 clients. Devín was cut off and, according to the regional president, keeping supplies flowing was the priority.' },
  obnova: { title: 'Return and recovery', short: 'revocation, damage, reimbursement', what: 'Once the threat passes, the emergency situation is revoked without delay. Then comes the “KONIEC OHROZENIA” (end of threat) signal, a damage survey, an evaluation of the flood and reimbursement of protection and rescue costs.', who: 'The authorities that declared the situation, flood commissions, Environment Ministry and government.', example: 'The government approved the flood report and reimbursement of more than €10.82 million on 21 May 2025, about eight months after the flood.' },
}
export const enSirens = ['fluctuating siren tone when an emergency threatens or occurs', 'steady siren tone when there is a threat from destructive water', 'steady siren tone, not repeated']
export const enSirenNames = ['GENERAL THREAT', 'WATER THREAT', 'END OF THREAT']

/* ---------- Kritická analýza a odporúčania ---------- */
export const enVerdicts = { silne: 'Worked', zmiesane: 'Mixed', slabe: 'Weak point' }
export const enAnalysis: Record<string, { title: string; findings: string[]; assessment: string }> = {
  g1: {
    title: 'Preparedness of public administration',
    findings: [
      'The Interior Ministry’s crisis staff met on 12 Sep. On 13 Sep the Central Flood Commission had 650 t of sand, mobile barriers and about 320 to 800 soldiers on standby. This was 5 to 6 days before the Danube peaked in Bratislava.',
      'The Interior Ministry activated Copernicus EMS satellite mapping on 13 Sep, before small streams peaked.',
      'According to Denník N, Bratislava’s Danube flood defences worked as designed.',
    ],
    assessment: 'At national level, preparation started on time and in the right order: forecast, crisis staff, materials and forces on standby. On a large river with several days of lead time the system worked. Preparation was weaker for small foothill streams, where lead time is measured in hours (see H4).',
  },
  g2: {
    title: 'Availability and clarity of information',
    findings: [
      'SHMÚ published water levels and warnings online and issued extraordinary hydrological bulletins for flood protection authorities.',
      'On 13 Sep, after the Central Flood Commission the environment minister spoke of a “100-year flood” on the Morava and at most level 2 on the Danube. In reality the Morava at Moravský Svätý Ján reached a 10-year flow and the Danube exceeded level 3 at all Slovak gauges.',
      'Denník N reported that the minister’s public statements differed from SHMÚ forecasts and that the extraordinary hydrological bulletins produced a large number of hard-to-follow e-mails.',
      'As early as 12 Sep the environment minister estimated that the Morava could reach 1,400 m³/s within days and would overflow at 1,500 m³/s. The actual peak flow at Moravský Svätý Ján was 1,059 m³/s.',
    ],
    assessment: 'The gap between the 13 Sep forecast and what happened is not a forecasting error. It is normal uncertainty several days before a peak. The problem arises when the public is given a single number without a range and without a clear author. We recommend one authoritative voice for hydrological data (SHMÚ) and communicating forecasts as ranges with scenarios.',
  },
  g3: {
    title: 'Coordination between organisations',
    findings: [
      'SHMÚ flood reports list more than 70 declarations of flood activity levels over nine days (13–21 Sep) for villages, towns, districts and the region. They were made by mayors and heads of district offices.',
      'According to Denník N, the mayor of Devínska Nová Ves learned about the pumping station failure from firefighters, and the minister disputed the failure. The claim is contested.',
      'According to TASR, the armed forces carried residents, supplied cut-off villages and helped with flood barriers.',
    ],
    assessment: 'The decentralised model, where the mayor declares the level for a municipality and the district head for a district, follows the law and allows a fast response. But a flood on a river that runs through many municipalities produces many parallel decisions. A shared public overview of what applies where was missing. Information on critical infrastructure, such as pumping stations, should go directly to mayors, not indirectly through rescue units.',
  },
  g4: {
    title: 'Warning and protecting the public',
    findings: [
      'On large rivers the level-3 warning was valid several days before the peak: Bratislava about 89 h, Malacky (Záhorská Ves) about 92 h.',
      'On small streams of the Little Carpathians the level-3 warning came shortly before or after the peak. In Pezinok it applied from 07:01, but the Blatina peaked at 06:00. In Trnava it applied from 05:55 and the Parná peaked at 08:15. A level-2 warning applied in both districts from 14 Sep 06:00.',
      'A national mobile warning system (SK-Alert) did not exist in September 2024. Its launch was about two years late.',
      'Municipalities used their own channels. Čadca warned on Facebook as early as Thursday 12 Sep, but according to Denník N some Stupava residents did not get sandbags.',
    ],
    assessment: 'This is the clearest weak point. SHMÚ warnings on large rivers gave enough lead time, but in flash floods on small streams the highest warning level no longer leaves time to react. The level-2 warning, and how municipalities turn it into concrete steps, is what matters. Without mobile alerts, reach depended on sirens, media and each municipality’s social media. (Lead time calculated by the authors from tables 4.5–4.7 and 3.3–3.8 of the SHMÚ flood report.)',
  },
  g5: {
    title: 'Emergency provision',
    findings: [
      'Devín was cut off, and according to the regional president, residents of Devínska Nová Ves could leave only by army shuttle.',
      'Chľaba had no road access for about four days and the army helped with supplies. Social care homes in Chľaba and nearby Kováčov had about 270 clients.',
      'Čadca prepared a sports hall for a possible evacuation.',
    ],
    assessment: 'Emergency provision was secured by improvisation, with major help from the army. But a pattern repeats: villages and boroughs with a single access road become isolated during floods. Civil protection plans should include alternative access and a list of vulnerable people, such as social care clients.',
  },
  g6: {
    title: 'Recovery and funding',
    findings: [
      'The government approved the flood report and reimbursement of more than €10.82 million only on 21 May 2025, about eight months after the flood.',
      'Damage in the second half of 2024 exceeded €7.66 million, mostly state property (over €4.32 million) and municipal property (over €3.09 million).',
      'On 20 Sep 2024 the prime minister announced about €1 billion from EU cohesion funds. This was a preliminary statement.',
    ],
    assessment: 'The long delay between municipalities’ spending on rescue work and its reimbursement burdens small municipalities most. The large gap between announced EU funds and quantified damage shows that money should be tied primarily to prevention, such as water retention in small stream basins, not only to recovery.',
  },
}

export const enRecs: Record<string, { target: string; items: string[] }> = {
  stat: { target: 'State administration', items: ['Finish SK-Alert (cell broadcast) without delay and test it regularly. Connect flood warnings to it at district level based on SHMÚ warnings.', 'Introduce a single real-time public overview of declared flood levels and emergency situations, for example a map on the Interior Ministry website.', 'Shorten reimbursement of municipal costs, for example with an advance payment within 60 days of revoking the flood level.'] },
  samosprava: { target: 'Municipalities', items: ['For small foothill streams, link concrete municipal steps (sandbags, closures, contacting vulnerable people) to the level-2 warning.', 'Update flood plans and civil protection plans with alternative access routes and a list of vulnerable people and facilities.', 'Publish sandbag collection points and evacuation sites in advance and remind residents regularly.'] },
  izs: { target: 'Rescue services', items: ['Create a direct communication channel between the manager of flood infrastructure and the mayor of the threatened municipality.', 'Agree on and exercise in advance the use of the armed forces for shuttle transport and supply of isolated places.'] },
  info: { target: 'Informing the public', items: ['Communicate hydrological forecasts as ranges with scenarios and a clear author (SHMÚ), not as a single number from a political briefing.', 'Use municipal social media and loudspeakers with a common message template: what is happening, where, what to do and where to get help.'] },
  prevencia: { target: 'Preventive planning', items: ['Prioritise funding for water retention measures in the basins of streams in the Little Carpathians and Záhorie, where 20- to 100-year flows occurred.', 'After every flood, publish an evaluation of the crisis management response. The Czech environment ministry’s preliminary report on the September 2024 flood can serve as a model.'] },
}

/* ---------- Porovnania a rok 2026 ---------- */
export const enProtection = 'Bratislava’s flood defences (2007–2010) cost almost €33 million: 14.5 km of underground sealing walls, 5.5 km of flood walls, more than 2.3 km of earth dikes, almost 3 km of mobile barriers and a new pumping station in Devínska Nová Ves.'

export const enCzVsSk: { topic: string; cz: string; sk: string }[] = [
  { topic: 'First warning of extreme rainfall', cz: 'ČHMÚ issued a warning of extreme rainfall on the morning of 11 Sep for the whole four-day period of 12–15 Sep. According to the report this allowed flood authorities to be activated early.', sk: 'SHMÚ issued the first level-3 hydrological warnings on 13 Sep (Myjava from 12:00). The Interior Ministry’s crisis staff had met on 12 Sep.' },
  { topic: 'Reservoirs', cz: 'Unprecedented storage was released in reservoirs before the flood. Flood wave attenuation reached up to 80 % in some cases.', sk: 'According to SHMÚ, retention in the Czech reservoirs of Vranov, Znojmo and Nové Mlýny lowered and lengthened the flood wave of the Dyje. The Dyje flows into the Morava upstream of the Slovak section.' },
  { topic: 'Crisis regime', cz: 'A state of danger was declared in the Moravian-Silesian and Olomouc regions and briefly in the Liberec region.', sk: 'An emergency situation applied in the whole Bratislava Region (from 15 Sep) and in individual municipalities, such as Chľaba.' },
  { topic: 'Crisis communication', cz: 'The state communicated under one slogan, #SpolecneToZvladneme. The report nevertheless recommends merging warnings into a single channel via ČHMÚ.', sk: 'Denník N criticised differences between the minister’s public statements and SHMÚ forecasts and described coordination as creaking in places.' },
  { topic: 'Mobile alerts', cz: 'The report recommends introducing Cell Broadcast for early warning in threatened areas.', sk: 'SK-Alert (Cell Broadcast) was not running in 2024. According to 2026 reports, live operation is still only being prepared.' },
  { topic: 'Evacuation', cz: 'Carrying out and enforcing ordered evacuations was a problem. Many people underestimated the situation, which raised the risk for rescuers.', sk: 'The sources used do not document a large ordered evacuation. A call to prepare (Stupava) and army shuttle transport (Devínska Nová Ves) are documented.' },
  { topic: 'EU Solidarity Fund', cz: '€113,979,781', sk: '€2,108,187' },
]

export const enStatus = { hotovo: 'Done', prebieha: 'In progress', meska: 'Delayed', eu: 'EU level' }
export const enWhatsNew: { date: string; title: string; text: string }[] = [
  { date: '6 Feb 2025', title: 'EU Court of Justice: Slovakia breached the Floods Directive', text: 'The court found that Slovakia did not review and update its flood risk management plans and risk maps in time (by 22 Dec 2021). The ruling carries no financial penalty. According to the minister, Slovakia caught up on its obligations in early January 2025.' },
  { date: '26 Mar 2025', title: 'EU Preparedness Strategy: 72 hours of self-reliance', text: 'The European Commission adopted the Preparedness Union Strategy. Among other things it encourages people to keep essential supplies for at least 72 hours in an emergency and proposes an EU Preparedness Day and preparedness lessons in schools.' },
  { date: '1 May 2025', title: 'New decree on the flood forecasting service', text: 'Decree No. 66/2025 changes the rules for SHMÚ’s extraordinary hydrological bulletins (Decree No. 204/2010). Bulletins start as soon as flood level I is exceeded and follow fixed times by level: at 06:00 and 18:00 for level I, four times a day for level II, and every three hours for level III and an emergency situation. The ministry proposed the change in September 2024 based on practical experience.' },
  { date: '21 May 2025', title: 'Reimbursement of 2024 flood costs', text: 'The government approved the report on floods in the second half of 2024 and more than €10.82 million to reimburse municipal and state costs.' },
  { date: '4 Jun 2025', title: 'EU Solidarity Fund: €2.1 million for Slovakia', text: 'The European Parliament and Council decided to mobilise the Solidarity Fund. Slovakia received €2,108,187 for the September flood (application of 7 Dec 2024).' },
  { date: 'June 2026 (plan)', title: 'Restoration of the Morava basin', text: 'An SVP project funded by the Recovery Plan covering about 17 km of the Morava basin (Sekule, Moravský Svätý Ján, Malé and Veľké Leváre, Gajary). It aims to restore side arms and the floodplain and improve water retention. Completion was planned for June 2026; we have not verified that it was completed.' },
  { date: 'status 9/2026', title: 'SK-Alert: mobile warnings still not running', text: 'The Cell Broadcast system (a message to every phone in the affected area, no number or app needed) was originally planned for summer 2022. As of September 2026 the project is being implemented with €3.18 million from Programme Slovakia (about €2.97 million for SK-Alert itself). Neither a public test date nor the start of live operation had been announced.' },
]

/* ---------- Fotky z miest ---------- */
export const enPhotoPlaces: Record<string, { name: string; note?: string; alts: string[] }> = {
  bratislava: {
    name: 'Bratislava – Danube in the city centre',
    alts: ['Flooded Tyršovo embankment, SNP Bridge and Bratislava Castle in the background', 'Flooded Tyršovo embankment seen from the Old Bridge', 'Flooded Danube embankment in Bratislava, aerial view', 'Flooded Danube embankment in central Bratislava', 'Panorama of the flooded Danube with the Old Bridge', 'Flooded embankment by the Comenius University Faculty of Arts, seen from the Old Bridge', 'Flooded Danube from the Old Bridge towards the Faculty of Arts', 'Flooded Danube from the Old Bridge towards Eurovea', 'Flooded embankment by the Faculty of Arts, looking towards the Old Bridge', 'Flooded Danube from the Old Bridge towards Eurovea'],
  },
  'zahorska-ves': {
    name: 'Morava at Záhorská Ves (Austrian bank, Angern an der March)',
    note: 'The photos are from the Austrian bank of the Morava, directly opposite Záhorská Ves. The Angern – Záhorská Ves ferry was out of service.',
    alts: ['Closed road to the Angern – Záhorská Ves ferry with a “Kein Fährbetrieb” (no ferry) sign', 'Flooded road beyond the Angern an der March town sign', 'Flooded Morava floodplain between Angern and Záhorská Ves', 'Gauge staff in flooded terrain by the Morava', 'Flooded vegetation in the Morava floodplain', 'Road ending in the flooded Morava'],
  },
  holic: {
    name: 'Morava at Holíč and Hodonín',
    note: 'The photos are from the Czech bank of the Morava at Hodonín, on the border with Holíč.',
    alts: ['Mobile flood barriers by the swollen Morava', 'Closed path along the swollen Morava, bridge in the background', 'Swollen Morava by the border bridge', 'Flooded Morava seen from the bridge'],
  },
  sutok: {
    name: 'Confluence of the Morava and Danube – satellite view',
    alts: ['Landsat false-colour image: flooded Morava floodplain above its confluence with the Danube'],
  },
}

/* ---------- Mapa: vyhlásenia SPA a poznámky ---------- */
export const enWho = (who: string) =>
  who
    .replace(/^prednosta OÚ BA$/, 'head of Bratislava District Office')
    .replace(/^prednosta OÚ (.+)$/, 'head of $1 District Office')
    .replace(/^zástupca starostu$/, 'deputy mayor')
    .replace(/^(starosta|starostka|primátor)$/, 'mayor')

export const enPeakNotes: Record<string, string> = {
  'Devín': '1st peak 17 Sep at 03:00 (905 cm, 9,305 m³/s), 2nd peak 18 Sep at 06:00.',
  'Bratislava': '1st peak 17 Sep at 10:45 (970 cm), 2nd peak 18 Sep at 13:30 (985 cm).',
  'Devínska Nová Ves': 'The level was strongly affected by backwater from the Danube.',
  'Jakubov': 'According to SHMÚ, the situation was influenced by a breach of the stream’s dike.',
  'Kolárovo': 'The rise was caused by backwater from the high Danube.',
}

export const enDamages = ['State property', 'Municipal property', 'Individuals', 'Companies and entrepreneurs']

export const enCategory = {
  pravo: 'Legislation',
  oficialne: 'Official reports and state documents',
  hydro: 'Hydrological and meteorological data',
  odborne: 'Expert and comparative sources',
  samosprava: 'Regional and municipal documents',
  media: 'News sources (secondary)',
  foto: 'Photographs and base maps',
}
