
import os
import json


def export_subject_buttons(buttons, data_path, filename):

    output_json = {}

    for data in buttons:

        id = data[0]
        menu_title = data[1]

        output_json[id] = menu_title

    print("saving file:", filename)
    with open(data_path + filename, "w", encoding="utf-8") as f:
        json.dump(output_json, f)


def export_data(year_data, data_path, filename):

    output_json = {}
    
    for subject in year_data:
    
        id = subject[0]
        card_title = subject[1]
        terms = subject[2]

        output_json[id] = {
            "title": card_title,
            "terms": {
                "autumn": {
                    "first": terms[0],
                    "second": terms[1]
                },
                "spring": {
                    "first": terms[2],
                    "second": terms[3]
                },
                "summer": {
                    "first": terms[4],
                    "second": terms[5]
                }
            }
        }

    print("saving file:", filename)
    with open(data_path + filename, "w", encoding="utf-8") as f:
        json.dump(output_json, f)


def get_ks3_data(files, text_path):

    for f in files:

        print("reading file:", f)
        with open(text_path + f, "r", encoding="utf-8") as file:
            lines = file.readlines()

        lines_list = []
        for l in lines:
            new_line = l.strip()
            if len(new_line) > 0:
                lines_list.append(new_line)

        line_num = 0

        line = lines_list[line_num]
        id = line.removeprefix("id:").strip()
        line_num += 1

        line = lines_list[line_num]
        menu_title = line.removeprefix("menu title:").strip()
        line_num += 1

        line = lines_list[line_num]
        card_title = line.removeprefix("card title:").strip()
        line_num += 1

        line = lines_list[line_num]

        subject_data = []
        HT_data = []

        while line in ["Y7", "Y8", "Y9"]:
            year = int(line[1:])

            if year == 7:
                current_buttons = Y7_subject_buttons
                current_year_data = Y7_data
            elif year == 8:
                current_buttons = Y8_subject_buttons
                current_year_data = Y8_data
            elif year == 9:
                current_buttons = Y9_subject_buttons
                current_year_data = Y9_data
            else:
                break

            current_buttons.append([id, menu_title])
            
            subject_data.append(id)
            subject_data.append(card_title)
            subject_data.append([])

            line_num += 1
            if line_num >= len(lines_list):
                break

            line = lines_list[line_num]

            while line in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                half_term = int(line[2])

                line_num += 1
                if line_num >= len(lines_list):
                    break

                line = lines_list[line_num]

                while line not in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                    HT_data.append(line)

                    line_num += 1
                    if line_num >= len(lines_list):
                        break

                    line = lines_list[line_num]
                    if line[0] == "Y":
                        break

                subject_data[2].append(HT_data.copy())
                HT_data.clear()

            current_year_data.append(subject_data.copy())
            subject_data.clear()


def get_ks4_gcse_data(files, text_path):

    for f in files:

        print("reading file:", f)
        with open(text_path + f, "r", encoding="utf-8") as file:
            lines = file.readlines()

        lines_list = []
        for l in lines:
            new_line = l.strip()
            if len(new_line) > 0:
                lines_list.append(new_line)

        line_num = 0

        line = lines_list[line_num]
        id = line.removeprefix("id:").strip()
        line_num += 1

        line = lines_list[line_num]
        menu_title = line.removeprefix("menu title:").strip()
        line_num += 1

        line = lines_list[line_num]
        card_title = line.removeprefix("card title:").strip()
        line_num += 1

        line = lines_list[line_num]

        subject_data = []
        HT_data = []

        while line in ["Y10", "Y11"]:
            year = int(line[1:])

            if year == 10:
                current_buttons = Y10_gcse_subject_buttons
                current_year_data = Y10_gcse_data
            elif year == 11:
                current_buttons = Y11_gcse_subject_buttons
                current_year_data = Y11_gcse_data
            else:
                break

            current_buttons.append([id, menu_title])
            
            subject_data.append(id)
            subject_data.append(card_title)
            subject_data.append([])

            line_num += 1
            if line_num >= len(lines_list):
                break

            line = lines_list[line_num]

            while line in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                half_term = int(line[2])

                line_num += 1
                if line_num >= len(lines_list):
                    break

                line = lines_list[line_num]

                while line not in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                    HT_data.append(line)

                    line_num += 1
                    if line_num >= len(lines_list):
                        break

                    line = lines_list[line_num]
                    if line[0] == "Y":
                        break

                subject_data[2].append(HT_data.copy())
                HT_data.clear()

            current_year_data.append(subject_data.copy())
            subject_data.clear()


def get_ks4_btec_data(files, text_path):

    for f in files:

        print("reading file:", f)
        with open(text_path + f, "r", encoding="utf-8") as file:
            lines = file.readlines()

        lines_list = []
        for l in lines:
            new_line = l.strip()
            if len(new_line) > 0:
                lines_list.append(new_line)

        line_num = 0

        line = lines_list[line_num]
        id = line.removeprefix("id:").strip()
        line_num += 1

        line = lines_list[line_num]
        menu_title = line.removeprefix("menu title:").strip()
        line_num += 1

        line = lines_list[line_num]
        card_title = line.removeprefix("card title:").strip()
        line_num += 1

        line = lines_list[line_num]

        subject_data = []
        HT_data = []

        while line in ["Y10", "Y11"]:
            year = int(line[1:])

            if year == 10:
                current_buttons = Y10_btec_subject_buttons
                current_year_data = Y10_btec_data
            elif year == 11:
                current_buttons = Y11_btec_subject_buttons
                current_year_data = Y11_btec_data
            else:
                break

            current_buttons.append([id, menu_title])
            
            subject_data.append(id)
            subject_data.append(card_title)
            subject_data.append([])

            line_num += 1
            if line_num >= len(lines_list):
                break

            line = lines_list[line_num]

            while line in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                half_term = int(line[2])

                line_num += 1
                if line_num >= len(lines_list):
                    break

                line = lines_list[line_num]

                while line not in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                    HT_data.append(line)

                    line_num += 1
                    if line_num >= len(lines_list):
                        break

                    line = lines_list[line_num]
                    if line[0] == "Y":
                        break

                subject_data[2].append(HT_data.copy())
                HT_data.clear()

            current_year_data.append(subject_data.copy())
            subject_data.clear()


def get_ks4_cambnat_data(files, text_path):

    for f in files:

        print("reading file:", f)
        with open(text_path + f, "r", encoding="utf-8") as file:
            lines = file.readlines()

        lines_list = []
        for l in lines:
            new_line = l.strip()
            if len(new_line) > 0:
                lines_list.append(new_line)

        line_num = 0

        line = lines_list[line_num]
        id = line.removeprefix("id:").strip()
        line_num += 1

        line = lines_list[line_num]
        menu_title = line.removeprefix("menu title:").strip()
        line_num += 1

        line = lines_list[line_num]
        card_title = line.removeprefix("card title:").strip()
        line_num += 1

        line = lines_list[line_num]

        subject_data = []
        HT_data = []

        while line in ["Y10", "Y11"]:
            year = int(line[1:])

            if year == 10:
                current_buttons = Y10_cambnat_subject_buttons
                current_year_data = Y10_cambnat_data
            elif year == 11:
                current_buttons = Y11_cambnat_subject_buttons
                current_year_data = Y11_cambnat_data
            else:
                break

            current_buttons.append([id, menu_title])
            
            subject_data.append(id)
            subject_data.append(card_title)
            subject_data.append([])

            line_num += 1
            if line_num >= len(lines_list):
                break

            line = lines_list[line_num]

            while line in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                half_term = int(line[2])

                line_num += 1
                if line_num >= len(lines_list):
                    break

                line = lines_list[line_num]

                while line not in ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6"]:

                    HT_data.append(line)

                    line_num += 1
                    if line_num >= len(lines_list):
                        break

                    line = lines_list[line_num]
                    if line[0] == "Y":
                        break

                subject_data[2].append(HT_data.copy())
                HT_data.clear()

            current_year_data.append(subject_data.copy())
            subject_data.clear()




print("\nkey stage 3\n")

Y7_subject_buttons = []
Y8_subject_buttons = []
Y9_subject_buttons = []

Y7_data = []
Y8_data = []
Y9_data = []

text_path = "./learning-journeys-text/ks3/"
files = os.listdir(text_path)

get_ks3_data(files, text_path)

data_path = "./learning-journeys-data/ks3/"

export_subject_buttons(Y7_subject_buttons, data_path, "y7-btns.json")
export_data(Y7_data, data_path, "y7.json")

export_subject_buttons(Y8_subject_buttons, data_path, "y8-btns.json")
export_data(Y8_data, data_path, "y8.json")

export_subject_buttons(Y9_subject_buttons, data_path, "y9-btns.json")
export_data(Y9_data, data_path, "y9.json")


print("\nkey stage 4 gcse\n")

Y10_gcse_subject_buttons = []
Y11_gcse_subject_buttons = []

Y10_gcse_data = []
Y11_gcse_data = []

text_path = "./learning-journeys-text/ks4/gcse/"
files = os.listdir(text_path)

get_ks4_gcse_data(files, text_path)

data_path = "./learning-journeys-data/ks4/gcse/"

export_subject_buttons(Y10_gcse_subject_buttons, data_path, "y10-btns.json")
export_data(Y10_gcse_data, data_path, "y10.json")

export_subject_buttons(Y11_gcse_subject_buttons, data_path, "y11-btns.json")
export_data(Y11_gcse_data, data_path, "y11.json")


print("\nkey stage 4 btec\n")

Y10_btec_subject_buttons = []
Y11_btec_subject_buttons = []

Y10_btec_data = []
Y11_btec_data = []

text_path = "./learning-journeys-text/ks4/btec/"
files = os.listdir(text_path)

get_ks4_btec_data(files, text_path)

data_path = "./learning-journeys-data/ks4/btec/"

export_subject_buttons(Y10_btec_subject_buttons, data_path, "y10-btns.json")
export_data(Y10_btec_data, data_path, "y10.json")

export_subject_buttons(Y11_btec_subject_buttons, data_path, "y11-btns.json")
export_data(Y11_btec_data, data_path, "y11.json")


print("\nkey stage 4 cambnat\n")

Y10_cambnat_subject_buttons = []
Y11_cambnat_subject_buttons = []

Y10_cambnat_data = []
Y11_cambnat_data = []

text_path = "./learning-journeys-text/ks4/cambridge-national/"
files = os.listdir(text_path)

get_ks4_cambnat_data(files, text_path)

data_path = "./learning-journeys-data/ks4/cambridge-national/"

export_subject_buttons(Y10_cambnat_subject_buttons, data_path, "y10-btns.json")
export_data(Y10_cambnat_data, data_path, "y10.json")

export_subject_buttons(Y11_cambnat_subject_buttons, data_path, "y11-btns.json")
export_data(Y11_cambnat_data, data_path, "y11.json")



