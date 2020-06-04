<template>
    <v-select
        v-model="timezone"
        :items="items"
        item-text="text"
        item-value="value"
        outlined
    >

    </v-select>
</template>



<script>
export default {
    props: ["timezone"],
    data(){
        return {
            items: [
                    {
                        "value":"Pacific/Honolulu",
                        "text":"(GMT-10:00) Hawaii Time"
                    },
                    {
                        "value":"America/Anchorage",
                        "text":"(GMT-9:00) Alaska Time"
                    },
                    {
                        "value":"America/Los_Angeles",
                        "text":"(GMT-8:00) Pacific Time"
                    },
                    {
                        "value":"America/Denver",
                        "text":"(GMT-7:00) Mountain Time - Denver"
                    },
                    {
                        "value":"America/Phoenix",
                        "text":"(GMT-7:00) Arizona Time"
                    },
                    {
                        "value":"America/Chicago",
                        "text":"(GMT-6:00) Central Time"
                    },
                    {
                        "value":"America/New_York",
                        "text":"(GMT-5:00) Eastern Time"
                    },
                    {
                        "value":"Pacific/Apia",
                        "text":"(GMT+14:00) Apia"
                    },
                    {
                        "value":"Pacific/Midway",
                        "text":"(GMT-11:00) Midway"
                    },
                    {
                        "value":"Pacific/Niue",
                        "text":"(GMT-11:00) Niue"
                    },
                    {
                        "value":"Pacific/Pago_Pago",
                        "text":"(GMT-11:00) Pago Pago"
                    },
                    {
                        "value":"Pacific/Fakaofo",
                        "text":"(GMT+13:00) Fakaofo"
                    },
                    {
                        "value":"Pacific/Johnston",
                        "text":"(GMT-10:00) Johnston"
                    },
                    {
                        "value":"Pacific/Rarotonga",
                        "text":"(GMT-10:00) Rarotonga"
                    },
                    {
                        "value":"Pacific/Tahiti",
                        "text":"(GMT-10:00) Tahiti"
                    },
                    {
                        "value":"Pacific/Marquesas",
                        "text":"(GMT-9:30) Marquesas"
                    },
                    {
                        "value":"Pacific/Gambier",
                        "text":"(GMT-9:00) Gambier"
                    },
                    {
                        "value":"America/Tijuana",
                        "text":"(GMT-8:00) Pacific Time - Tijuana"
                    },
                    {
                        "value":"America/Vancouver",
                        "text":"(GMT-8:00) Pacific Time - Vancouver"
                    },
                    {
                        "value":"America/Whitehorse",
                        "text":"(GMT-8:00) Pacific Time - Whitehorse"
                    },
                    {
                        "value":"Pacific/Pitcairn",
                        "text":"(GMT-8:00) Pitcairn"
                    },
                    {
                        "value":"America/Dawson_Creek",
                        "text":"(GMT-7:00) Mountain Time - Dawson Creek"
                    },
                    {
                        "value":"America/Edmonton",
                        "text":"(GMT-7:00) Mountain Time - Edmonton"
                    },
                    {
                        "value":"America/Hermosillo",
                        "text":"(GMT-7:00) Mountain Time - Hermosillo"
                    },
                    {
                        "value":"America/Mazatlan",
                        "text":"(GMT-7:00) Mountain Time - Chihuahua, Mazatlan"
                    },
                    {
                        "value":"America/Yellowknife",
                        "text":"(GMT-7:00) Mountain Time - Yellowknife"
                    },
                    {
                        "value":"America/Belize",
                        "text":"(GMT-6:00) Belize"
                    },
                    {
                        "value":"America/Costa_Rica",
                        "text":"(GMT-6:00) Costa Rica"
                    },
                    {
                        "value":"America/El_Salvador",
                        "text":"(GMT-6:00) El Salvador"
                    },
                    {
                        "value":"America/Guatemala",
                        "text":"(GMT-6:00) Guatemala"
                    },
                    {
                        "value":"America/Managua",
                        "text":"(GMT-6:00) Managua"
                    },
                    {
                        "value":"America/Mexico_City",
                        "text":"(GMT-6:00) Central Time - Mexico City"
                    },
                    {
                        "value":"America/Regina",
                        "text":"(GMT-6:00) Central Time - Regina"
                    },
                    {
                        "value":"America/Tegucigalpa",
                        "text":"(GMT-6:00) Central Time - Tegucigalpa (no DST)"
                    },
                    {
                        "value":"America/Winnipeg",
                        "text":"(GMT-6:00) Central Time - Winnipeg"
                    },
                    {
                        "value":"Pacific/Easter",
                        "text":"(GMT-5:00) Easter Island"
                    },
                    {
                        "value":"Pacific/Galapagos",
                        "text":"(GMT-6:00) Galapagos"
                    },
                    {
                        "value":"America/Bogota",
                        "text":"(GMT-5:00) Bogota"
                    },
                    {
                        "value":"America/Cayman",
                        "text":"(GMT-5:00) Cayman"
                    },
                    {
                        "value":"America/Grand_Turk",
                        "text":"(GMT-5:00) Grand Turk"
                    },
                    {
                        "value":"America/Guayaquil",
                        "text":"(GMT-5:00) Guayaquil"
                    },
                    {
                        "value":"America/Havana",
                        "text":"(GMT-5:00) Havana"
                    },
                    {
                        "value":"America/Iqaluit",
                        "text":"(GMT-5:00) Eastern Time - Iqaluit"
                    },
                    {
                        "value":"America/Jamaica",
                        "text":"(GMT-5:00) Jamaica"
                    },
                    {
                        "value":"America/Lima",
                        "text":"(GMT-5:00) Lima"
                    },
                    {
                        "value":"America/Cancun",
                        "text":"(GMT-5:00) Cancun - Eastern Time - Quintana Roo"
                    },
                    {
                        "value":"America/Nassau",
                        "text":"(GMT-5:00) Nassau"
                    },
                    {
                        "value":"America/Panama",
                        "text":"(GMT-5:00) Panama"
                    },
                    {
                        "value":"America/Port-au-Prince",
                        "text":"(GMT-5:00) Port-au-Prince"
                    },
                    {
                        "value":"America/Toronto",
                        "text":"(GMT-5:00) Eastern Time - Toronto"
                    },
                    {
                        "value":"America/Caracas",
                        "text":"(GMT-4:00) Caracas"
                    },
                    {
                        "value":"America/Anguilla",
                        "text":"(GMT-4:00) Anguilla"
                    },
                    {
                        "value":"America/Antigua",
                        "text":"(GMT-4:00) Antigua"
                    },
                    {
                        "value":"America/Aruba",
                        "text":"(GMT-4:00) Aruba"
                    },
                    {
                        "value":"America/Asuncion",
                        "text":"(GMT-3:00) Asuncion"
                    },
                    {
                        "value":"America/Barbados",
                        "text":"(GMT-4:00) Barbados"
                    },
                    {
                        "value":"America/Boa_Vista",
                        "text":"(GMT-4:00) Boa Vista"
                    },
                    {
                        "value":"America/Campo_Grande",
                        "text":"(GMT-4:00) Campo Grande"
                    },
                    {
                        "value":"America/Cuiaba",
                        "text":"(GMT-4:00) Cuiaba"
                    },
                    {
                        "value":"America/Curacao",
                        "text":"(GMT-4:00) Curacao"
                    },
                    {
                        "value":"America/Dominica",
                        "text":"(GMT-4:00) Dominica"
                    },
                    {
                        "value":"America/Grenada",
                        "text":"(GMT-4:00) Grenada"
                    },
                    {
                        "value":"America/Guadeloupe",
                        "text":"(GMT-4:00) Guadeloupe"
                    },
                    {
                        "value":"America/Guyana",
                        "text":"(GMT-4:00) Guyana"
                    },
                    {
                        "value":"America/Halifax",
                        "text":"(GMT-4:00) Atlantic Time - Halifax"
                    },
                    {
                        "value":"America/La_Paz",
                        "text":"(GMT-4:00) La Paz"
                    },
                    {
                        "value":"America/Manaus",
                        "text":"(GMT-4:00) Manaus"
                    },
                    {
                        "value":"America/Martinique",
                        "text":"(GMT-4:00) Martinique"
                    },
                    {
                        "value":"America/Montserrat",
                        "text":"(GMT-4:00) Montserrat"
                    },
                    {
                        "value":"America/Port_of_Spain",
                        "text":"(GMT-4:00) Port of Spain"
                    },
                    {
                        "value":"America/Porto_Velho",
                        "text":"(GMT-4:00) Porto Velho"
                    },
                    {
                        "value":"America/Puerto_Rico",
                        "text":"(GMT-4:00) Puerto Rico"
                    },
                    {
                        "value":"America/Rio_Branco",
                        "text":"(GMT-5:00) Rio Branco"
                    },
                    {
                        "value":"America/Santiago",
                        "text":"(GMT-3:00) Santiago"
                    },
                    {
                        "value":"America/Santo_Domingo",
                        "text":"(GMT-4:00) Santo Domingo"
                    },
                    {
                        "value":"America/St_Kitts",
                        "text":"(GMT-4:00) St. Kitts"
                    },
                    {
                        "value":"America/St_Lucia",
                        "text":"(GMT-4:00) St. Lucia"
                    },
                    {
                        "value":"America/St_Thomas",
                        "text":"(GMT-4:00) St. Thomas"
                    },
                    {
                        "value":"America/St_Vincent",
                        "text":"(GMT-4:00) St. Vincent"
                    },
                    {
                        "value":"America/Thule",
                        "text":"(GMT-4:00) Thule"
                    },
                    {
                        "value":"America/Tortola",
                        "text":"(GMT-4:00) Tortola"
                    },
                    {
                        "value":"Antarctica/Palmer",
                        "text":"(GMT-3:00) Palmer"
                    },
                    {
                        "value":"Atlantic/Bermuda",
                        "text":"(GMT-4:00) Bermuda"
                    },
                    {
                        "value":"Atlantic/Stanley",
                        "text":"(GMT-3:00) Stanley"
                    },
                    {
                        "value":"America/St_Johns",
                        "text":"(GMT-3:30) Newfoundland Time - St. Johns"
                    },
                    {
                        "value":"America/Araguaina",
                        "text":"(GMT-3:00) Araguaina"
                    },
                    {
                        "value":"America/Argentina/Buenos_Aires",
                        "text":"(GMT-3:00) Buenos Aires"
                    },
                    {
                        "value":"America/Bahia",
                        "text":"(GMT-3:00) Salvador"
                    },
                    {
                        "value":"America/Belem",
                        "text":"(GMT-3:00) Belem"
                    },
                    {
                        "value":"America/Cayenne",
                        "text":"(GMT-3:00) Cayenne"
                    },
                    {
                        "value":"America/Fortaleza",
                        "text":"(GMT-3:00) Fortaleza"
                    },
                    {
                        "value":"America/Godthab",
                        "text":"(GMT-3:00) Godthab"
                    },
                    {
                        "value":"America/Maceio",
                        "text":"(GMT-3:00) Maceio"
                    },
                    {
                        "value":"America/Miquelon",
                        "text":"(GMT-3:00) Miquelon"
                    },
                    {
                        "value":"America/Montevideo",
                        "text":"(GMT-3:00) Montevideo"
                    },
                    {
                        "value":"America/Paramaribo",
                        "text":"(GMT-3:00) Paramaribo"
                    },
                    {
                        "value":"America/Recife",
                        "text":"(GMT-3:00) Recife"
                    },
                    {
                        "value":"America/Sao_Paulo",
                        "text":"(GMT-3:00) Sao Paulo"
                    },
                    {
                        "value":"Antarctica/Rothera",
                        "text":"(GMT-3:00) Rothera"
                    },
                    {
                        "value":"America/Noronha",
                        "text":"(GMT-2:00) Noronha"
                    },
                    {
                        "value":"Atlantic/South_Georgia",
                        "text":"(GMT-2:00) South Georgia"
                    },
                    {
                        "value":"America/Scoresbysund",
                        "text":"(GMT-1:00) Scoresbysund"
                    },
                    {
                        "value":"Atlantic/Azores",
                        "text":"(GMT-1:00) Azores"
                    },
                    {
                        "value":"Atlantic/Cape_Verde",
                        "text":"(GMT-1:00) Cape Verde"
                    },
                    {
                        "value":"Africa/Abidjan",
                        "text":"(GMT+0:00) Abidjan"
                    },
                    {
                        "value":"Africa/Accra",
                        "text":"(GMT+0:00) Accra"
                    },
                    {
                        "value":"Africa/Bamako",
                        "text":"(GMT+0:00) Bamako"
                    },
                    {
                        "value":"Africa/Banjul",
                        "text":"(GMT+0:00) Banjul"
                    },
                    {
                        "value":"Africa/Bissau",
                        "text":"(GMT+0:00) Bissau"
                    },
                    {
                        "value":"Africa/Casablanca",
                        "text":"(GMT+1:00) Casablanca"
                    },
                    {
                        "value":"Africa/Conakry",
                        "text":"(GMT+0:00) Conakry"
                    },
                    {
                        "value":"Africa/Dakar",
                        "text":"(GMT+0:00) Dakar"
                    },
                    {
                        "value":"Africa/El_Aaiun",
                        "text":"(GMT+1:00) El Aaiun"
                    },
                    {
                        "value":"Africa/Freetown",
                        "text":"(GMT+0:00) Freetown"
                    },
                    {
                        "value":"Africa/Lome",
                        "text":"(GMT+0:00) Lome"
                    },
                    {
                        "value":"Africa/Monrovia",
                        "text":"(GMT+0:00) Monrovia"
                    },
                    {
                        "value":"Africa/Nouakchott",
                        "text":"(GMT+0:00) Nouakchott"
                    },
                    {
                        "value":"Africa/Ouagadougou",
                        "text":"(GMT+0:00) Ouagadougou"
                    },
                    {
                        "value":"Africa/Sao_Tome",
                        "text":"(GMT+0:00) Sao Tome"
                    },
                    {
                        "value":"America/Danmarkshavn",
                        "text":"(GMT+0:00) Danmarkshavn"
                    },
                    {
                        "value":"Atlantic/Canary",
                        "text":"(GMT+0:00) Canary Islands"
                    },
                    {
                        "value":"Atlantic/Faroe",
                        "text":"(GMT+0:00) Faeroe"
                    },
                    {
                        "value":"Atlantic/Reykjavik",
                        "text":"(GMT+0:00) Reykjavik"
                    },
                    {
                        "value":"Atlantic/St_Helena",
                        "text":"(GMT+0:00) St Helena"
                    },
                    {
                        "value":"Etc/GMT",
                        "text":"(GMT+0:00) GMT (no daylight saving)"
                    },
                    {
                        "value":"Europe/Dublin",
                        "text":"(GMT+0:00) Dublin"
                    },
                    {
                        "value":"Europe/Lisbon",
                        "text":"(GMT+0:00) Lisbon"
                    },
                    {
                        "value":"Europe/London",
                        "text":"(GMT+0:00) London"
                    },
                    {
                        "value":"Africa/Algiers",
                        "text":"(GMT+1:00) Algiers"
                    },
                    {
                        "value":"Africa/Bangui",
                        "text":"(GMT+1:00) Bangui"
                    },
                    {
                        "value":"Africa/Brazzaville",
                        "text":"(GMT+1:00) Brazzaville"
                    },
                    {
                        "value":"Africa/Ceuta",
                        "text":"(GMT+1:00) Ceuta"
                    },
                    {
                        "value":"Africa/Douala",
                        "text":"(GMT+1:00) Douala"
                    },
                    {
                        "value":"Africa/Kinshasa",
                        "text":"(GMT+1:00) Kinshasa"
                    },
                    {
                        "value":"Africa/Lagos",
                        "text":"(GMT+1:00) Lagos"
                    },
                    {
                        "value":"Africa/Libreville",
                        "text":"(GMT+1:00) Libreville"
                    },
                    {
                        "value":"Africa/Luanda",
                        "text":"(GMT+1:00) Luanda"
                    },
                    {
                        "value":"Africa/Malabo",
                        "text":"(GMT+1:00) Malabo"
                    },
                    {
                        "value":"Africa/Ndjamena",
                        "text":"(GMT+1:00) Ndjamena"
                    },
                    {
                        "value":"Africa/Niamey",
                        "text":"(GMT+1:00) Niamey"
                    },
                    {
                        "value":"Africa/Porto-Novo",
                        "text":"(GMT+1:00) Porto-Novo"
                    },
                    {
                        "value":"Africa/Tunis",
                        "text":"(GMT+1:00) Tunis"
                    },
                    {
                        "value":"Africa/Windhoek",
                        "text":"(GMT+2:00) Windhoek"
                    },
                    {
                        "value":"Europe/Amsterdam",
                        "text":"(GMT+1:00) Amsterdam"
                    },
                    {
                        "value":"Europe/Andorra",
                        "text":"(GMT+1:00) Andorra"
                    },
                    {
                        "value":"Europe/Belgrade",
                        "text":"(GMT+1:00) Central European Time (Europe/Belgrade)"
                    },
                    {
                        "value":"Europe/Berlin",
                        "text":"(GMT+1:00) Berlin"
                    },
                    {
                        "value":"Europe/Brussels",
                        "text":"(GMT+1:00) Brussels"
                    },
                    {
                        "value":"Europe/Budapest",
                        "text":"(GMT+1:00) Budapest"
                    },
                    {
                        "value":"Europe/Copenhagen",
                        "text":"(GMT+1:00) Copenhagen"
                    },
                    {
                        "value":"Europe/Gibraltar",
                        "text":"(GMT+1:00) Gibraltar"
                    },
                    {
                        "value":"Europe/Luxembourg",
                        "text":"(GMT+1:00) Luxembourg"
                    },
                    {
                        "value":"Europe/Madrid",
                        "text":"(GMT+1:00) Madrid"
                    },
                    {
                        "value":"Europe/Malta",
                        "text":"(GMT+1:00) Malta"
                    },
                    {
                        "value":"Europe/Monaco",
                        "text":"(GMT+1:00) Monaco"
                    },
                    {
                        "value":"Europe/Oslo",
                        "text":"(GMT+1:00) Oslo"
                    },
                    {
                        "value":"Europe/Paris",
                        "text":"(GMT+1:00) Paris"
                    },
                    {
                        "value":"Europe/Prague",
                        "text":"(GMT+1:00) Central European Time (Europe/Prague)"
                    },
                    {
                        "value":"Europe/Rome",
                        "text":"(GMT+1:00) Rome"
                    },
                    {
                        "value":"Europe/Stockholm",
                        "text":"(GMT+1:00) Stockholm"
                    },
                    {
                        "value":"Europe/Tirane",
                        "text":"(GMT+1:00) Tirane"
                    },
                    {
                        "value":"Europe/Vaduz",
                        "text":"(GMT+1:00) Vaduz"
                    },
                    {
                        "value":"Europe/Vienna",
                        "text":"(GMT+1:00) Vienna"
                    },
                    {
                        "value":"Europe/Warsaw",
                        "text":"(GMT+1:00) Warsaw"
                    },
                    {
                        "value":"Europe/Zurich",
                        "text":"(GMT+1:00) Zurich"
                    },
                    {
                        "value":"Africa/Blantyre",
                        "text":"(GMT+2:00) Blantyre"
                    },
                    {
                        "value":"Africa/Bujumbura",
                        "text":"(GMT+2:00) Bujumbura"
                    },
                    {
                        "value":"Africa/Cairo",
                        "text":"(GMT+2:00) Cairo"
                    },
                    {
                        "value":"Africa/Gaborone",
                        "text":"(GMT+2:00) Gaborone"
                    },
                    {
                        "value":"Africa/Harare",
                        "text":"(GMT+2:00) Harare"
                    },
                    {
                        "value":"Africa/Johannesburg",
                        "text":"(GMT+2:00) Johannesburg"
                    },
                    {
                        "value":"Africa/Kigali",
                        "text":"(GMT+2:00) Kigali"
                    },
                    {
                        "value":"Africa/Lubumbashi",
                        "text":"(GMT+2:00) Lubumbashi"
                    },
                    {
                        "value":"Africa/Lusaka",
                        "text":"(GMT+2:00) Lusaka"
                    },
                    {
                        "value":"Africa/Maputo",
                        "text":"(GMT+2:00) Maputo"
                    },
                    {
                        "value":"Africa/Maseru",
                        "text":"(GMT+2:00) Maseru"
                    },
                    {
                        "value":"Africa/Mbabane",
                        "text":"(GMT+2:00) Mbabane"
                    },
                    {
                        "value":"Africa/Tripoli",
                        "text":"(GMT+2:00) Tripoli"
                    },
                    {
                        "value":"Asia/Amman",
                        "text":"(GMT+2:00) Amman"
                    },
                    {
                        "value":"Asia/Beirut",
                        "text":"(GMT+2:00) Beirut"
                    },
                    {
                        "value":"Asia/Damascus",
                        "text":"(GMT+2:00) Damascus"
                    },
                    {
                        "value":"Asia/Gaza",
                        "text":"(GMT+2:00) Gaza"
                    },
                    {
                        "value":"Asia/Jerusalem",
                        "text":"(GMT+2:00) Jerusalem"
                    },
                    {
                        "value":"Asia/Nicosia",
                        "text":"(GMT+2:00) Nicosia"
                    },
                    {
                        "value":"Europe/Athens",
                        "text":"(GMT+2:00) Athens"
                    },
                    {
                        "value":"Europe/Bucharest",
                        "text":"(GMT+2:00) Bucharest"
                    },
                    {
                        "value":"Europe/Chisinau",
                        "text":"(GMT+2:00) Chisinau"
                    },
                    {
                        "value":"Europe/Helsinki",
                        "text":"(GMT+2:00) Helsinki"
                    },
                    {
                        "value":"Europe/Istanbul",
                        "text":"(GMT+3:00) Istanbul"
                    },
                    {
                        "value":"Europe/Kaliningrad",
                        "text":"(GMT+2:00) Russia - Kaliningrad"
                    },
                    {
                        "value":"Europe/Kiev",
                        "text":"(GMT+2:00) Kiev"
                    },
                    {
                        "value":"Europe/Minsk",
                        "text":"(GMT+3:00) Minsk"
                    },
                    {
                        "value":"Europe/Riga",
                        "text":"(GMT+2:00) Riga"
                    },
                    {
                        "value":"Europe/Sofia",
                        "text":"(GMT+2:00) Sofia"
                    },
                    {
                        "value":"Europe/Tallinn",
                        "text":"(GMT+2:00) Tallinn"
                    },
                    {
                        "value":"Europe/Vilnius",
                        "text":"(GMT+2:00) Vilnius"
                    },
                    {
                        "value":"Africa/Addis_Ababa",
                        "text":"(GMT+3:00) Addis Ababa"
                    },
                    {
                        "value":"Africa/Asmara",
                        "text":"(GMT+3:00) Asmera"
                    },
                    {
                        "value":"Africa/Dar_es_Salaam",
                        "text":"(GMT+3:00) Dar es Salaam"
                    },
                    {
                        "value":"Africa/Djibouti",
                        "text":"(GMT+3:00) Djibouti"
                    },
                    {
                        "value":"Africa/Kampala",
                        "text":"(GMT+3:00) Kampala"
                    },
                    {
                        "value":"Africa/Khartoum",
                        "text":"(GMT+2:00) Khartoum"
                    },
                    {
                        "value":"Africa/Mogadishu",
                        "text":"(GMT+3:00) Mogadishu"
                    },
                    {
                        "value":"Africa/Nairobi",
                        "text":"(GMT+3:00) Nairobi"
                    },
                    {
                        "value":"Antarctica/Syowa",
                        "text":"(GMT+3:00) Syowa"
                    },
                    {
                        "value":"Asia/Aden",
                        "text":"(GMT+3:00) Aden"
                    },
                    {
                        "value":"Asia/Baghdad",
                        "text":"(GMT+3:00) Baghdad"
                    },
                    {
                        "value":"Asia/Bahrain",
                        "text":"(GMT+3:00) Bahrain"
                    },
                    {
                        "value":"Asia/Kuwait",
                        "text":"(GMT+3:00) Kuwait"
                    },
                    {
                        "value":"Asia/Qatar",
                        "text":"(GMT+3:00) Qatar"
                    },
                    {
                        "value":"Asia/Riyadh",
                        "text":"(GMT+3:00) Riyadh"
                    },
                    {
                        "value":"Europe/Moscow",
                        "text":"(GMT+3:00) Russia - Moscow"
                    },
                    {
                        "value":"Indian/Antananarivo",
                        "text":"(GMT+3:00) Antananarivo"
                    },
                    {
                        "value":"Indian/Comoro",
                        "text":"(GMT+3:00) Comoro"
                    },
                    {
                        "value":"Indian/Mayotte",
                        "text":"(GMT+3:00) Mayotte"
                    },
                    {
                        "value":"Asia/Tehran",
                        "text":"(GMT+3:30) Tehran"
                    },
                    {
                        "value":"Asia/Baku",
                        "text":"(GMT+4:00) Baku"
                    },
                    {
                        "value":"Asia/Dubai",
                        "text":"(GMT+4:00) Dubai"
                    },
                    {
                        "value":"Asia/Muscat",
                        "text":"(GMT+4:00) Muscat"
                    },
                    {
                        "value":"Asia/Tbilisi",
                        "text":"(GMT+4:00) Tbilisi"
                    },
                    {
                        "value":"Asia/Yerevan",
                        "text":"(GMT+4:00) Yerevan"
                    },
                    {
                        "value":"Europe/Samara",
                        "text":"(GMT+4:00) Russia - Samara"
                    },
                    {
                        "value":"Indian/Mahe",
                        "text":"(GMT+4:00) Mahe"
                    },
                    {
                        "value":"Indian/Mauritius",
                        "text":"(GMT+4:00) Mauritius"
                    },
                    {
                        "value":"Indian/Reunion",
                        "text":"(GMT+4:00) Reunion"
                    },
                    {
                        "value":"Asia/Kabul",
                        "text":"(GMT+4:30) Kabul"
                    },
                    {
                        "value":"Asia/Aqtau",
                        "text":"(GMT+5:00) Aqtau"
                    },
                    {
                        "value":"Asia/Aqtobe",
                        "text":"(GMT+5:00) Aqtobe"
                    },
                    {
                        "value":"Asia/Ashgabat",
                        "text":"(GMT+5:00) Ashgabat"
                    },
                    {
                        "value":"Asia/Dushanbe",
                        "text":"(GMT+5:00) Dushanbe"
                    },
                    {
                        "value":"Asia/Karachi",
                        "text":"(GMT+5:00) Karachi"
                    },
                    {
                        "value":"Asia/Tashkent",
                        "text":"(GMT+5:00) Tashkent"
                    },
                    {
                        "value":"Asia/Yekaterinburg",
                        "text":"(GMT+5:00) Russia - Yekaterinburg"
                    },
                    {
                        "value":"Indian/Kerguelen",
                        "text":"(GMT+5:00) Kerguelen"
                    },
                    {
                        "value":"Indian/Maldives",
                        "text":"(GMT+5:00) Maldives"
                    },
                    {
                        "value":"Asia/Kolkata",
                        "text":"(GMT+5:30) India Standard Time"
                    },
                    {
                        "value":"Asia/Colombo",
                        "text":"(GMT+5:30) Colombo"
                    },
                    {
                        "value":"Asia/Kathmandu",
                        "text":"(GMT+5:45) Katmandu"
                    },
                    {
                        "value":"Antarctica/Mawson",
                        "text":"(GMT+5:00) Mawson"
                    },
                    {
                        "value":"Antarctica/Vostok",
                        "text":"(GMT+6:00) Vostok"
                    },
                    {
                        "value":"Asia/Almaty",
                        "text":"(GMT+6:00) Almaty"
                    },
                    {
                        "value":"Asia/Bishkek",
                        "text":"(GMT+6:00) Bishkek"
                    },
                    {
                        "value":"Asia/Dhaka",
                        "text":"(GMT+6:00) Dhaka"
                    },
                    {
                        "value":"Asia/Omsk",
                        "text":"(GMT+6:00) Russia - Omsk, Novosibirsk"
                    },
                    {
                        "value":"Asia/Thimphu",
                        "text":"(GMT+6:00) Thimphu"
                    },
                    {
                        "value":"Indian/Chagos",
                        "text":"(GMT+6:00) Chagos"
                    },
                    {
                        "value":"Asia/Rangoon",
                        "text":"(GMT+6:30) Rangoon"
                    },
                    {
                        "value":"Indian/Cocos",
                        "text":"(GMT+6:30) Cocos"
                    },
                    {
                        "value":"Antarctica/Davis",
                        "text":"(GMT+7:00) Davis"
                    },
                    {
                        "value":"Asia/Bangkok",
                        "text":"(GMT+7:00) Bangkok"
                    },
                    {
                        "value":"Asia/Hovd",
                        "text":"(GMT+7:00) Hovd"
                    },
                    {
                        "value":"Asia/Jakarta",
                        "text":"(GMT+7:00) Jakarta"
                    },
                    {
                        "value":"Asia/Krasnoyarsk",
                        "text":"(GMT+7:00) Russia - Krasnoyarsk"
                    },
                    {
                        "value":"Asia/Phnom_Penh",
                        "text":"(GMT+7:00) Phnom Penh"
                    },
                    {
                        "value":"Asia/Ho_Chi_Minh",
                        "text":"(GMT+7:00) Hanoi"
                    },
                    {
                        "value":"Asia/Vientiane",
                        "text":"(GMT+7:00) Vientiane"
                    },
                    {
                        "value":"Indian/Christmas",
                        "text":"(GMT+7:00) Christmas"
                    },
                    {
                        "value":"Antarctica/Casey",
                        "text":"(GMT+8:00) Casey"
                    },
                    {
                        "value":"Asia/Brunei",
                        "text":"(GMT+8:00) Brunei"
                    },
                    {
                        "value":"Asia/Choibalsan",
                        "text":"(GMT+8:00) Choibalsan"
                    },
                    {
                        "value":"Asia/Hong_Kong",
                        "text":"(GMT+8:00) Hong Kong"
                    },
                    {
                        "value":"Asia/Irkutsk",
                        "text":"(GMT+8:00) Russia - Irkutsk"
                    },
                    {
                        "value":"Asia/Kuala_Lumpur",
                        "text":"(GMT+8:00) Kuala Lumpur"
                    },
                    {
                        "value":"Asia/Macau",
                        "text":"(GMT+8:00) Macau"
                    },
                    {
                        "value":"Asia/Makassar",
                        "text":"(GMT+8:00) Makassar"
                    },
                    {
                        "value":"Asia/Manila",
                        "text":"(GMT+8:00) Manila"
                    },
                    {
                        "value":"Asia/Shanghai",
                        "text":"(GMT+8:00) China Time - Beijing"
                    },
                    {
                        "value":"Asia/Singapore",
                        "text":"(GMT+8:00) Singapore"
                    },
                    {
                        "value":"Asia/Taipei",
                        "text":"(GMT+8:00) Taipei"
                    },
                    {
                        "value":"Asia/Ulaanbaatar",
                        "text":"(GMT+8:00) Ulaanbaatar"
                    },
                    {
                        "value":"Australia/Perth",
                        "text":"(GMT+8:00) Western Time - Perth"
                    },
                    {
                        "value":"Asia/Dili",
                        "text":"(GMT+9:00) Dili"
                    },
                    {
                        "value":"Asia/Jayapura",
                        "text":"(GMT+9:00) Jayapura"
                    },
                    {
                        "value":"Asia/Pyongyang",
                        "text":"(GMT+9:00) Pyongyang"
                    },
                    {
                        "value":"Asia/Seoul",
                        "text":"(GMT+9:00) Seoul"
                    },
                    {
                        "value":"Asia/Tokyo",
                        "text":"(GMT+9:00) Tokyo"
                    },
                    {
                        "value":"Asia/Yakutsk",
                        "text":"(GMT+9:00) Russia - Yakutsk"
                    },
                    {
                        "value":"Pacific/Palau",
                        "text":"(GMT+9:00) Palau"
                    },
                    {
                        "value":"Australia/Adelaide",
                        "text":"(GMT+10:30) Central Time - Adelaide"
                    },
                    {
                        "value":"Australia/Darwin",
                        "text":"(GMT+9:30) Central Time - Darwin"
                    },
                    {
                        "value":"Antarctica/DumontDUrville",
                        "text":"(GMT+10:00) Dumont D'Urville"
                    },
                    {
                        "value":"Asia/Vladivostok",
                        "text":"(GMT+10:00) Russia - Yuzhno-Sakhalinsk"
                    },
                    {
                        "value":"Australia/Brisbane",
                        "text":"(GMT+10:00) Eastern Time - Brisbane"
                    },
                    {
                        "value":"Australia/Hobart",
                        "text":"(GMT+11:00) Eastern Time - Hobart"
                    },
                    {
                        "value":"Australia/Sydney",
                        "text":"(GMT+11:00) Eastern Time - Sydney"
                    },
                    {
                        "value":"Australia/Melbourne",
                        "text":"(GMT+11:00) Eastern Time - Melbourne"
                    },
                    {
                        "value":"Pacific/Guam",
                        "text":"(GMT+10:00) Guam"
                    },
                    {
                        "value":"Pacific/Port_Moresby",
                        "text":"(GMT+10:00) Port Moresby"
                    },
                    {
                        "value":"Pacific/Saipan",
                        "text":"(GMT+10:00) Saipan"
                    },
                    {
                        "value":"Pacific/Chuuk",
                        "text":"(GMT+10:00) Chuuk"
                    },
                    {
                        "value":"Asia/Magadan",
                        "text":"(GMT+11:00) Russia - Magadan"
                    },
                    {
                        "value":"Pacific/Efate",
                        "text":"(GMT+11:00) Efate"
                    },
                    {
                        "value":"Pacific/Guadalcanal",
                        "text":"(GMT+11:00) Guadalcanal"
                    },
                    {
                        "value":"Pacific/Kosrae",
                        "text":"(GMT+11:00) Kosrae"
                    },
                    {
                        "value":"Pacific/Noumea",
                        "text":"(GMT+11:00) Noumea"
                    },
                    {
                        "value":"Pacific/Pohnpei",
                        "text":"(GMT+11:00) Pohnpei"
                    },
                    {
                        "value":"Pacific/Norfolk",
                        "text":"(GMT+11:00) Norfolk"
                    },
                    {
                        "value":"Asia/Kamchatka",
                        "text":"(GMT+12:00) Russia - Petropavlovsk-Kamchatskiy"
                    },
                    {
                        "value":"Pacific/Auckland",
                        "text":"(GMT+13:00) Auckland"
                    },
                    {
                        "value":"Pacific/Fiji",
                        "text":"(GMT+13:00) Fiji"
                    },
                    {
                        "value":"Pacific/Funafuti",
                        "text":"(GMT+12:00) Funafuti"
                    },
                    {
                        "value":"Pacific/Kwajalein",
                        "text":"(GMT+12:00) Kwajalein"
                    },
                    {
                        "value":"Pacific/Majuro",
                        "text":"(GMT+12:00) Majuro"
                    },
                    {
                        "value":"Pacific/Nauru",
                        "text":"(GMT+12:00) Nauru"
                    },
                    {
                        "value":"Pacific/Tarawa",
                        "text":"(GMT+12:00) Tarawa"
                    },
                    {
                        "value":"Pacific/Wake",
                        "text":"(GMT+12:00) Wake"
                    },
                    {
                        "value":"Pacific/Wallis",
                        "text":"(GMT+12:00) Wallis"
                    },
                    {
                        "value":"Pacific/Enderbury",
                        "text":"(GMT+13:00) Enderbury"
                    },
                    {
                        "value":"Pacific/Tongatapu",
                        "text":"(GMT+13:00) Tongatapu"
                    },
                    {
                        "value":"Pacific/Kiritimati",
                        "text":"(GMT+14:00) Kiritimati"
                    }
                    ]
        }
    },
    mounted(){
      
    },
    watch: {
        timezone(newValue){
            this.$emit("updateTimezone", newValue);
        }
    }
}
</script>