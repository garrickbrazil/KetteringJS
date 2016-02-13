#===========================================================
#    This file makes the KetteringJS library by
#    simply concatenating many source files together
#    and skipping the header to avoid repetition
#===========================================================

import fileinput
import os

# Params
headerLen = 16
coreFile = "KetteringJS-Core.js"
outputFile = "KetteringJS.js"
folderToCheck = "js"
folderToOutput = "bin"

# Get source files
sourceFiles = os.listdir( folderToCheck )


# Output
with open(os.path.join(folderToOutput, outputFile), 'w') as fout:


    # Copy KetteringJS-Core.js first
    for line in fileinput.input(os.path.join(folderToCheck, coreFile)):

        # Copy contents
        fout.write(line)

    # Go through source files
    for file in sourceFiles:


        # Only include javascript files
       if(file.endswith(".js") and str(file) != "KetteringJS-Core.js"):

            # Whitespace
            fout.write("\n")

            index = 0
            
            # Open file
            for line in fileinput.input(os.path.join(folderToCheck, file)):

                index += 1

                # Copy contents, skipping header
                if(index > headerLen):
                    fout.write(line)
