function getFlowSuggestion(zone, mood, objective) {
    let suggestion = "";
    switch (objective) {
      case 'Uppgift':
        switch (zone) {
          case 'Apati':
            switch (mood) {
              case 'good': suggestion = "Hitta en meningsfull lättare uppgift att fokusera på, kanske något du har skjutit upp."; break;
              case 'sad': suggestion = "Börja med något litet som kräver minimal ansträngning, fokusera på att komma igång."; break;
              case 'happy': suggestion = "Använd din positiva energi! Hitta något som verkligen intresserar dig, även om det är en liten uppgift."; break;
              case 'bad': suggestion = "Sök efter en enkel aktivitet som inte kräver mycket, fokusera på återhämtning först."; break;
              case 'neutral': suggestion = "Hitta en lätt uppgift att fokusera på för att bygga momentum. Små framsteg kan väcka intresset."; break;
            }
            break;
          case 'Tristess':
            switch (mood) {
              case 'good': suggestion = "Öka utmaningen i uppgiften eller sätt upp ett nytt, mer stimulerande mål. Vad kan du lära dig som kopplar till detta?"; break;
              case 'sad': suggestion = "Försök hitta en ny vinkel på uppgiften som gör den mer intressant. Kan du lägga till ett kreativt element?"; break;
              case 'happy': suggestion = "Kanalisera din positiva energi! Utmana dig själv att göra något du redan kan, men på ett nytt eller snabbare sätt."; break;
              case 'bad': suggestion = "Försök att omforma uppgiften. Kan du hitta ett litet delmål som känns mer meningsfullt att uppnå?"; break;
              case 'neutral': suggestion = "Öka utmaningen i uppgiften eller sätt upp ett mer ambitiöst mål. Kanske kan du lära dig något nytt kopplat till detta?"; break;
            }
            break;
          case 'Avslappning':
            switch (mood) {
              case 'good': suggestion = "Identifiera nästa steg och höj utmaningsnivån något för att hålla engagemanget uppe. Ett tidspressat moment eller ett nytt element kan hjälpa."; break;
              case 'sad': suggestion = "Tillåt dig att vara i det, men försök försiktigt att identifiera en liten, lättsam aktivitet som kan distrahera eller muntra upp dig."; break;
              case 'happy': suggestion = "Bygg vidare på den känslan genom att sätta ett lite mer utmanande men roligt mål. Kan du inspirera någon annan?"; break;
              case 'bad': suggestion = "Fokusera på grundläggande självvård. Kanske en kort stunds mindfulness eller en kopp te innan du funderar på nästa steg."; break;
              case 'neutral': suggestion = "Identifiera nästa steg och höj utmaningsnivån något. Kan du lägga till ett tidspressat moment eller ett nytt element?"; break;
            }
            break;
          case 'Oro':
            switch (mood) {
              case 'good': suggestion = "Använd din positiva inställning för att metodiskt bryta ner uppgiften i små, hanterbara delar. Fira varje delmål!"; break;
              case 'sad': suggestion = "Bryt ner uppgiften i mikrosteg och fokusera på bara det allra första. Andas djupt och ta det lugnt."; break;
              case 'happy': suggestion = "Utnyttja din energi till att skapa en tydlig plan. Visualisera framgång för varje litet steg i uppgiften."; break;
              case 'bad': suggestion = "Fokusera på att bara ta ett enda litet steg som känns hanterbart. Glöm inte att vara snäll mot dig själv."; break;
              case 'neutral': suggestion = "Bryt ner uppgiften i mindre, hanterbara delar och fokusera på en i taget. Glöm inte att fira små framsteg!"; break;
            }
            break;
          case 'Vardag':
            switch (mood) {
              case 'good': suggestion = "Fundera på hur du kan variera uppgiften eller lägga till ett lekfullt element. Kan du tävla mot dig själv för att öka engagemanget?"; break;
              case 'sad': suggestion = "Sök efter ett sätt att ge uppgiften lite mer mening eller att hitta en liten belöning efteråt."; break;
              case 'happy': suggestion = "Använd din glädje till att göra uppgiften till en utmaning eller experimentera med nya metoder."; break;
              case 'bad': suggestion = "Försök att bryta rutinen, även om det är en liten ändring. Kan du ta en kort paus och sedan se uppgiften med nya ögon?"; break;
              case 'neutral': suggestion = "Fundera på hur du kan variera uppgiften. Kan du lägga till ett lekfullt element eller tävla mot dig själv?"; break;
            }
            break;
          case 'Kontroll':
            switch (mood) {
              case 'good': suggestion = "Hitta en del av uppgiften du kan optimera ytterligare, eller sätt ett snävare tidsmål för att hålla dig skarp. Kan du hjälpa någon annan med din kunskap?"; break;
              case 'sad': suggestion = "Reflektera över vad som saknas trots din kontroll. Kan du hitta ett nytt, mer personligt mål inom uppgiften?"; break;
              case 'happy': suggestion = "Utmana dig själv att göra det ännu bättre, eller utforska hur du kan effektivisera processen ytterligare. Kanske kan du undervisa andra?"; break;
              case 'bad': suggestion = "Kanske är det dags att släppa lite på kontrollen och tillåta spontanitet, eller att delegera en del för att minska bördan."; break;
              case 'neutral': suggestion = "Hitta en del av uppgiften som du kan göra ännu bättre, eller sätt ett snävare tidsmål. Kan du hjälpa någon annan med din kunskap?"; break;
            }
            break;
          case 'Ångest':
            switch (mood) {
              case 'good': suggestion = "Kanalisera den energin till en mycket enkel, trygg uppgift som du vet att du klarar av."; break;
              case 'sad': suggestion = "Minska utmaningsnivån drastiskt. Fokusera på något lugnande, som att andas djupt eller ta en kort paus innan du försöker igen."; break;
              case 'happy': suggestion = "Försök att identifiera källan till ångesten. Kan du omvandla den överväldigande energin till en liten, konkret handling?"; break;
              case 'bad': suggestion = "Prioritera att lugna ner dig först. En kort meditation eller en stund i tystnad kan hjälpa. Minska sedan utmaningen radikalt."; break;
              case 'neutral': suggestion = "Minska utmaningsnivån drastiskt och fokusera på det du redan kan. Ta en paus och kom tillbaka med ett lugnare sinne."; break;
            }
            break;
          case 'Upphetsning':
            switch (mood) {
              case 'good': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
              case 'sad': suggestion = "Försök att jorda dig själv och hitta en produktiv väg för den upphetsade energin, så att den inte blir överväldigande."; break;
              case 'happy': suggestion = "Använd denna höga energi för att ta dig an en utmanande men meningsfull uppgift. Sätt ett specifikt, mätbart mål för att omvandla energin till produktivitet."; break;
              case 'bad': suggestion = "Ta en stund att lugna systemet. När du känner dig mer stabil, kan du försöka kanalisera energin in i en strukturerad aktivitet."; break;
              case 'neutral': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
            }
            break;
          case 'Flow': suggestion = "Håll fokus, njut av processen och reflektera över vad som gör att det känns så här bra."; break;
        }
        break;
      case 'Kontakt':
        switch (zone) {
          case 'Apati':
            switch (mood) {
              case 'good': suggestion = "Ta ett litet initiativ till kontakt. En enkel hälsning eller ett leende kan bryta isen."; break;
              case 'sad': suggestion = "Fokusera på ditt eget välmående. Om du känner dig redo, försök en mycket kort, ytlig interaktion utan krav."; break;
              case 'happy': suggestion = "Använd din positiva energi! Våga ta en lättsam kontakt, kanske en komplimang eller en kort kommentar om något gemensamt."; break;
              case 'bad': suggestion = "Prioritera ditt eget utrymme. Om du måste interagera, håll det kort och professionellt, utan att pressa dig själv."; break;
              case 'neutral': suggestion = "Ta ett litet initiativ till kontakt, som en enkel hälsning eller ett leende. Det kan räcka för att känna dig mer närvarande."; break;
            }
            break;
          case 'Tristess':
            switch (mood) {
              case 'good': suggestion = "Hitta ett ämne som intresserar både dig och den andra. Ställ öppna frågor för att utforska gemensamma intressen."; break;
              case 'sad': suggestion = "Fokusera på att lyssna in den andra personen. Ibland kan en intressant konversation uppstå när du minst anar det."; break;
              case 'happy': suggestion = "Föreslå en ny, lättsam aktivitet som ni kan göra tillsammans i grupp, t.ex. ett kortspel eller en fika."; break;
              case 'bad': suggestion = "Fundera på vad som gör interaktionen tråkig. Kan du ändra ämne eller artigt avsluta samtalet för att söka något mer stimulerande?"; break;
              case 'neutral': suggestion = "Hitta ett ämne som intresserar både dig och den andra. Ställ öppna frågor för att utforska gemensamma intressen och skapa en mer engagerande interaktion."; break;
            }
            break;
          case 'Avslappning':
            switch (mood) {
              case 'good': suggestion = "Njut av stunden och var dig själv. Din avslappnade attityd kan smitta av sig och underlätta interaktionen."; break;
              case 'sad': suggestion = "Tillåt dig att vara i nuet, även om du är ledsen. Du behöver inte prestera. Korta, lugna interaktioner utan krav är okej."; break;
              case 'happy': suggestion = "Utnyttja din harmoni. Våga vara spontan och inbjudande i samtal. Din positiva utstrålning kan underlätta kontakten."; break;
              case 'bad': suggestion = "Fokusera på din egen komfort. Om du känner dig obekväm, är det okej att ta ett steg tillbaka eller byta miljö."; break;
              case 'neutral': suggestion = "Njut av stunden och var dig själv. Din avslappnade attityd kan smitta av sig och underlätta interaktionen, vilket kan göra sociala situationer mindre påfrestande."; break;
            }
            break;
          case 'Oro':
            switch (mood) {
              case 'good': suggestion = "Fokusera på att vara närvarande och lyssna aktivt. Du behöver inte fylla tystnaden. Små, korta interaktioner är tillräckligt."; break;
              case 'sad': suggestion = "Var snäll mot dig själv. Det är okej att känna oro. Försök att fokusera på din andning och ta små steg, som att bara säga hej."; break;
              case 'happy': suggestion = "Använd din glädje för att hitta ett tryggt ämne att prata om, något du känner dig bekväm med. Låt det leda vägen."; break;
              case 'bad': suggestion = "Fokusera på att lugna dig själv först. Det är okej att undvika djupa sociala interaktioner just nu. En kort hälsning kan vara nog."; break;
              case 'neutral': suggestion = "Fokusera på att vara närvarande och lyssna aktivt. Du behöver inte fylla tystnaden. Små, korta interaktioner är tillräckligt för att träna på att hantera social oro."; break;
            }
            break;
          case 'Vardag':
            switch (mood) {
              case 'good': suggestion = "Hitta ett nytt, litet sätt att interagera med människor i din vardag. Kanske en vänlig kommentar eller en oväntad fråga."; break;
              case 'sad': suggestion = "Försök att uttrycka en liten uppskattning eller ett tack till någon du möter i din vardag. Små gester kan bryta känslan av ledsenhet."; break;
              case 'happy': suggestion = "Se det som en chans att injicera lite extra glädje i vardagsmöten. Ett leende eller en uppmuntrande kommentar kan lysa upp."; break;
              case 'bad': suggestion = "Fundera på en liten förändring i din rutin som kan göra sociala möten mer hanterbara. Kanske en kort paus före en interaktion."; break;
              case 'neutral': suggestion = "Hitta ett nytt, litet sätt att interagera med människor i din vardag. Kanske en vänlig kommentar, en oväntad fråga eller ett leende kan skapa en positiv förändring."; break;
            }
            break;
          case 'Kontroll':
            switch (mood) {
              case 'good': suggestion = "Tillåt dig att vara mer spontan och mindre planerad i sociala interaktioner. Öva på att följa med i flödet, även när du inte har full kontroll."; break;
              case 'sad': suggestion = "Fundera på om din önskan om kontroll hindrar dig från genuina möten. Att våga släppa lite kan skapa djupare kontakt."; break;
              case 'happy': suggestion = "Utmana dig att inte alltid ta ledningen i samtal. Låt andra ta initiativ och öva på att lyssna utan att genast svara."; break;
              case 'bad': suggestion = "Din kontroll kan vara en skyddsmekanism. Kanske kan du tillåta dig själv att vara lite sårbar och be om hjälp eller förståelse i en social situation."; break;
              case 'neutral': suggestion = "Tillåt dig att vara mer spontan och mindre planerad i sociala interaktioner. Öva på att följa med i flödet, även när du inte har full kontroll."; break;
            }
            break;
          case 'Ångest':
            switch (mood) {
              case 'good': suggestion = "Fokusera på korta, trygga interaktioner där du inte känner press. En enkel hälsning eller ett leende är mer än tillräckligt."; break;
              case 'sad': suggestion = "Prioritera att lugna dig själv. Försök att inte pressa dig till sociala situationer som känns överväldigande. En kort, tyst närvaro kan räcka."; break;
              case 'happy': suggestion = "Hitta en trygg person eller grupp att vistas med. Din positiva inställning kan hjälpa dig att hantera ångesten i en kontrollerad miljö."; break;
              case 'bad': suggestion = "Det är okej att ta ett steg tillbaka. Fokusera på egenvård och minska sociala krav. Du behöver inte prestera just nu."; break;
              case 'neutral': suggestion = "Minska trycket på dig själv i sociala situationer. Fokusera på korta, trygga interaktioner och tillåt dig att ta ett steg tillbaka om det känns överväldigande."; break;
            }
            break;
          case 'Upphetsning':
            switch (mood) {
              case 'good': suggestion = "Kanalisera din energi till att vara engagerad i samtalet, men var medveten om att inte dominera. Lyssna in andra."; break;
              case 'sad': suggestion = "Försök att jorda din energi genom att fokusera på en lugnande aktivitet, och närma dig sociala situationer med ett mer balanserat sinne."; break;
              case 'happy': suggestion = "Använd din höga energi till att sprida positivitet. Var entusiastisk, men se till att andra också får utrymme att bidra."; break;
              case 'bad': suggestion = "Din energi kan kännas överväldigande. Ta en paus och försök lugna dig innan du engagerar dig i sociala sammanhang."; break;
              case 'neutral': suggestion = "Kanalisera din energi till att vara engagerad i samtalet, men var medveten om att inte dominera. Lyssna in andra och bidra på ett balanserat sätt."; break;
            }
            break;
          case 'Flow': suggestion = "Njut av din förmåga att navigera sociala situationer med lätthet. Observera vad som gör att det känns så här bra och hur du kan replikera det."; break;
        }
        break;
      case 'Självkänsla':
        switch (zone) {
          case 'Apati':
            switch (mood) {
              case 'good': suggestion = "Hitta en meningsfull, lätt uppgift. Känslan av att klara något litet kan stärka din kompetens ytterligare."; break;
              case 'sad': suggestion = "Börja med en minimal aktivitet som du vet att du kan slutföra. Fokusera på egenvård."; break;
              case 'happy': suggestion = "Använd din positiva energi! Engagera dig aktivt i något där du kan se tydliga framsteg för att bygga upp din känsla av kompetens."; break;
              case 'bad': suggestion = "Välj en mycket enkel uppgift som ger dig en omedelbar känsla av att ha åstadkommit något. Var snäll mot dig själv."; break;
              case 'neutral': suggestion = "Börja med att aktivt engagera dig i en liten, hanterbar uppgift där du kan se tydliga framsteg. Detta bygger successivt upp din känsla av kompetens."; break;
            }
            break;
          case 'Tristess':
            switch (mood) {
              case 'good': suggestion = "Sök en ny utmaning som kittlar ditt intresse. Målet är att höja insatsen precis så mycket att du känner dig stimulerad, inte överväldigad."; break;
              case 'sad': suggestion = "Hitta en kreativ utmaning där processen är viktigare än resultatet. Låt dig experimentera och lära."; break;
              case 'happy': suggestion = "Utmana dig själv att bemästra en ny färdighet eller fördjupa dig i ett ämne som du brinner för."; break;
              case 'bad': suggestion = "Försök att hitta en uppgift där du kan få omedelbar feedback och se tydliga framsteg, för att bryta känslan av stagnation."; break;
              case 'neutral': suggestion = "Sök en ny utmaning som kittlar ditt intresse, där du får möjlighet att lära och utvecklas. Målet är att höja insatsen precis så mycket att du känner dig stimulerad, inte överväldigad."; break;
            }
            break;
          case 'Avslappning':
            switch (mood) {
              case 'good': suggestion = "Reflektera medvetet över dina styrkor och små segrar. Hur kan du tillämpa dina förmågor för att ta dig an en meningsfull utmaning som leder till djupare engagemang?"; break;
              case 'sad': suggestion = "Fokusera på att vila och återhämta dig. Erkänn att det är okej att inte alltid vara på topp."; break;
              case 'happy': suggestion = "Använd din inre balans för att sätta ett utmanande, men roligt, personligt mål som du kan arbeta mot."; break;
              case 'bad': suggestion = "Ge dig själv tid att reflektera. Kanske behöver du omvärdera dina mål för att minska pressen på dig själv."; break;
              case 'neutral': suggestion = "Reflektera medvetet över dina styrkor och små segrar. Visualisera hur du kan tillämpa dina förmågor för att ta dig an en meningsfull utmaning som leder till djupare engagemang."; break;
            }
            break;
          case 'Oro':
            switch (mood) {
              case 'good': suggestion = "Bryt ner stora tankar om dig själv till små, konkreta handlingar du kan utföra. Fokusera på att ta ett litet steg framåt och erkänn din ansträngning."; break;
              case 'sad': suggestion = "Fokusera på en mycket liten, hanterbar uppgift. Varje litet slutfört moment är en vinst."; break;
              case 'happy': suggestion = "Använd din glädje för att formulera konkreta, realistiska mål. Visualisera framgång för varje litet steg."; break;
              case 'bad': suggestion = "Minska trycket. Fokusera på en enda sak du kan göra för att må lite bättre just nu. Det är tillräckligt."; break;
              case 'neutral': suggestion = "Bryt ner stora tankar om dig själv till små, konkreta handlingar du kan utföra. Fokusera på att ta ett litet steg framåt och erkänn din ansträngning, oavsett resultat."; break;
            }
            break;
          case 'Vardag':
            switch (mood) {
              case 'good': suggestion = "Inför ett litet, medvetet ögonblick av utmaning i din rutin. Det kan vara att prova något nytt, lära dig en miniskill, eller aktivt söka en situation som kräver ditt fulla fokus."; break;
              case 'sad': suggestion = "Hitta en aktivitet som ger dig en känsla av tillfredsställelse, även om den är liten. Det kan vara att städa, laga mat, eller en kort promenad."; break;
              case 'happy': suggestion = "Se det som en möjlighet att finslipa en färdighet eller utforska ett nytt intresse som kan berika din självkänsla."; break;
              case 'bad': suggestion = "Fundera på vad som skulle ge dig en känsla av framsteg eller meningsfullhet. Även små förändringar kan hjälpa."; break;
              case 'neutral': suggestion = "Inför ett litet, medvetet ögonblick av utmaning i din rutin. Det kan vara att prova något nytt, lära dig en miniskill, eller aktivt söka en situation som kräver ditt fulla fokus."; break;
            }
            break;
          case 'Kontroll':
            switch (mood) {
              case 'good': suggestion = "Utforska gränserna för dina nuvarande färdigheter genom att aktivt söka nya tillämpningar eller undervisa andra. Detta fördjupar din förståelse och breddar din kompetens."; break;
              case 'sad': suggestion = "Fundera på om din kontroll hindrar dig från att vara autentisk eller sårbar. Att släppa lite kan stärka dig."; break;
              case 'happy': suggestion = "Fantastiskt! Utmana dig själv att dela din kunskap eller vägleda andra, det kan ytterligare stärka din självkänsla."; break;
              case 'bad': suggestion = "Kanske är din kontroll mer ett hinder än en hjälp. Tillåt dig själv att be om hjälp eller släppa taget lite."; break;
              case 'neutral': suggestion = "Utforska gränserna för dina nuvarande färdigheter genom att aktivt söka nya tillämpningar eller undervisa andra. Detta fördjupar din förståelse och breddar din kompetens."; break;
            }
            break;
          case 'Ångest':
            switch (mood) {
              case 'good': suggestion = "Försök att fokusera din energi på en lugnande och repetitiv aktivitet som inte triggar din ångest. Bygg uppåt därifrån."; break;
              case 'sad': suggestion = "Minska tillfälligt pressen på prestation. Ägna dig åt lugnande aktiviteter som kräver minimal mental ansträngning. Bygg uppåt därifrån."; break;
              case 'happy': suggestion = "Använd din positiva energi för att identifiera små, realistiska steg du kan ta för att lugna dig själv och bygga förtroende."; break;
              case 'bad': suggestion = "Prioritera att lugna systemet. Enkel andningsövning eller en stund i naturen kan hjälpa innan du tänker på prestation."; break;
              case 'neutral': suggestion = "Minska tillfälligt pressen på prestation. Fokusera på att aktivt återhämta dig och ägna dig åt lugnande aktiviteter som kräver minimal mental ansträngning. Bygg uppåt därifrån."; break;
            }
            break;
          case 'Upphetsning':
            switch (mood) {
              case 'good': suggestion = "Kanalisera din höga energi mot en tydligt definierad, meningsfull uppgift som kräver din fulla koncentration. Sätt ett specifikt, mätbart mål."; break;
              case 'sad': suggestion = "Försök att jorda dig själv. Kan du hitta ett kreativt uttryck för din energi som också hjälper dig att bearbeta dina känslor?"; break;
              case 'happy': suggestion = "Utnyttja denna kraftfulla energi för att fördjupa dig i ett projekt du brinner för. Din entusiasm är en resurs!"; break;
              case 'bad': suggestion = "Din höga energi kan bli överväldigande. Ta en paus och försök att lugna ner dig innan du kanaliserar energin in i en uppgift."; break;
              case 'neutral': suggestion = "Kanalisera din höga energi mot en tydligt definierad, meningsfull uppgift som kräver din fulla koncentration. Sätt ett specifikt, mätbart mål för att omvandla energin till produktivitet."; break;
            }
            break;
          case 'Flow': suggestion = "Du är i ett kraftfullt flow med din självkänsla! Observera vad som gör att du känner dig så här och hur du kan replikera det för att bibehålla känslan."; break;
        }
        break;
      case 'Hälsa & Träning':
        switch (zone) {
          case 'Apati':
            switch (mood) {
              case 'good': suggestion = "Välj en lätt träningsform som du faktiskt tycker om, som en lugn promenad eller lite stretchning. Sätt inga höga krav på dig själv."; break;
              case 'sad': suggestion = "Börja med något minimalt, som att resa dig och sträcka på dig i fem minuter. Fokusera på att komma igång, inte att prestera."; break;
              case 'happy': suggestion = "Använd din positiva energi! Hitta en rolig aktivitet du kan göra, kanske dansa till din favoritlåt eller cykla en sväng."; break;
              case 'bad': suggestion = "Fokusera på återhämtning. Kanske en kort andningsövning eller lite lugn yoga kan hjälpa. Lyssna på din kropp."; break;
              case 'neutral': suggestion = "Hitta en lätt aktivitet att fokusera på för att bygga momentum. Små steg som att ta trapporna istället för hissen kan väcka intresset."; break;
            }
            break;
          case 'Tristess':
            switch (mood) {
              case 'good': suggestion = "Öka utmaningen i din träning med en ny övning, ett nytt träningsprogram eller ett mer ambitiöst mål. Vad kan du lära dig som kopplar till detta?"; break;
              case 'sad': suggestion = "Försök hitta en ny vinkel på träningen som gör den mer intressant. Kan du lägga till ett kreativt inslag, som en annorlunda löprunda eller en ny sport?"; break;
              case 'happy': suggestion = "Kanalisera din positiva energi! Utmana dig själv att göra något du redan kan, men på ett nytt eller snabbare sätt."; break;
              case 'bad': suggestion = "Försök att omforma din träningsrutin. Kan du hitta ett litet delmål som känns mer meningsfullt att uppnå?"; break;
              case 'neutral': suggestion = "Öka utmaningen i din träningsrutin eller sätt upp ett mer ambitiöst mål. Kanske kan du lära dig något nytt kopplat till detta?"; break;
            }
            break;
          case 'Avslappning':
            switch (mood) {
              case 'good': suggestion = "Njut av din lugna energi. Sätt ett lite mer utmanande mål för att hålla engagemanget uppe, men glöm inte att också njuta av processen."; break;
              case 'sad': suggestion = "Tillåt dig att vara i det. Fokusera på att återhämta dig fullt ut. En lugn promenad i naturen kan vara tillräckligt."; break;
              case 'happy': suggestion = "Använd din harmoni! Bygg vidare på den känslan genom att sätta ett lite mer utmanande men roligt mål. Kan du inspirera någon annan?"; break;
              case 'bad': suggestion = "Fokusera på grundläggande självvård. Kanske en kort stunds mindfulness eller meditation innan du funderar på nästa steg."; break;
              case 'neutral': suggestion = "Identifiera nästa steg och höj utmaningsnivån något. Kan du lägga till ett tidspressat moment eller ett nytt element i din träning?"; break;
            }
            break;
          case 'Oro':
            switch (mood) {
              case 'good': suggestion = "Använd din positiva inställning för att metodiskt bryta ner dina träningsmål i små, hanterbara delar. Fira varje delmål!"; break;
              case 'sad': suggestion = "Bryt ner träningspasset i mikrosteg och fokusera på bara det allra första. Andas djupt och ta det lugnt."; break;
              case 'happy': suggestion = "Utnyttja din energi till att skapa en tydlig träningsplan. Visualisera framgång för varje litet steg i passet."; break;
              case 'bad': suggestion = "Fokusera på att bara ta ett enda litet steg som känns hanterbart, som att göra en enda armhävning eller 10 knäböj."; break;
              case 'neutral': suggestion = "Bryt ner din träning i mindre, hanterbara delar och fokusera på en i taget. Glöm inte att fira små framsteg!"; break;
            }
            break;
          case 'Vardag':
            switch (mood) {
              case 'good': suggestion = "Fundera på hur du kan variera din träning eller lägga till ett lekfullt element. Kan du tävla mot dig själv för att öka engagemanget?"; break;
              case 'sad': suggestion = "Sök efter ett sätt att ge din träning lite mer mening eller att hitta en liten belöning efteråt."; break;
              case 'happy': suggestion = "Använd din glädje till att göra träningen till en utmaning eller experimentera med nya metoder."; break;
              case 'bad': suggestion = "Försök att bryta rutinen, även om det är en liten ändring. Kan du ta en kort paus och sedan se träningen med nya ögon?"; break;
              case 'neutral': suggestion = "Fundera på hur du kan variera din träning. Kan du lägga till ett lekfullt element eller tävla mot dig själv?"; break;
            }
            break;
          case 'Kontroll':
            switch (mood) {
              case 'good': suggestion = "Hitta en del av din träning du kan optimera ytterligare, eller sätt ett snävare tidsmål för att hålla dig skarp. Kan du hjälpa någon annan med din kunskap?"; break;
              case 'sad': suggestion = "Reflektera över vad som saknas trots din kontroll. Kan du hitta ett nytt, mer personligt mål med träningen?"; break;
              case 'happy': suggestion = "Utmana dig själv att göra det ännu bättre, eller utforska hur du kan effektivisera processen ytterligare. Kanske kan du undervisa andra?"; break;
              case 'bad': suggestion = "Kanske är det dags att släppa lite på kontrollen och tillåta spontanitet, eller att delegera en del för att minska bördan."; break;
              case 'neutral': suggestion = "Hitta en del av träningen som du kan göra ännu bättre, eller sätt ett snävare tidsmål. Kan du hjälpa någon annan med din kunskap?"; break;
            }
            break;
          case 'Ångest':
            switch (mood) {
              case 'good': suggestion = "Kanalisera den energin till en mycket enkel, trygg träningsform som du vet att du klarar av."; break;
              case 'sad': suggestion = "Minska utmaningsnivån drastiskt. Fokusera på något lugnande, som att andas djupt eller ta en kort paus innan du försöker igen."; break;
              case 'happy': suggestion = "Försök att identifiera källan till ångesten. Kan du omvandla den överväldigande energin till en liten, konkret handling?"; break;
              case 'bad': suggestion = "Prioritera att lugna ner dig först. En kort meditation eller en stund i tystnad kan hjälpa. Minska sedan utmaningen radikalt."; break;
              case 'neutral': suggestion = "Minska utmaningsnivån drastiskt och fokusera på det du redan kan. Ta en paus och kom tillbaka med ett lugnare sinne."; break;
            }
            break;
          case 'Upphetsning':
            switch (mood) {
              case 'good': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
              case 'sad': suggestion = "Försök att jorda dig själv och hitta en produktiv väg för den upphetsade energin, så att den inte blir överväldigande."; break;
              case 'happy': suggestion = "Använd denna höga energi för att ta dig an en utmanande men meningsfull träningsuppgift. Sätt ett specifikt, mätbart mål."; break;
              case 'bad': suggestion = "Ta en stund att lugna systemet. När du känner dig mer stabil, kan du försöka kanalisera energin in i en strukturerad aktivitet."; break;
              case 'neutral': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
            }
            break;
          case 'Flow': suggestion = "Håll fokus, njut av processen och reflektera över vad som gör att det känns så här bra."; break;
        }
        break;
      case 'Kreativitet':
        switch (zone) {
          case 'Apati':
            switch (mood) {
              case 'good': suggestion = "Börja med något meningsfullt och lätt. Kanske en snabb skiss, en dikt på en rad eller en bild på telefonen. Målet är att komma igång."; break;
              case 'sad': suggestion = "Fokusera på en minimal aktivitet, som att bara bläddra i en bok om konst eller lyssna på musik utan att skapa något. Släpp kraven."; break;
              case 'happy': suggestion = "Använd din positiva energi! Välj ett medium du känner dig bekväm med och skapa något fritt och spontant utan krav på perfektion."; break;
              case 'bad': suggestion = "Sök efter en enkel, kravlös aktivitet. Ta en promenad med fokus på att se färger och former, istället för att skapa något."; break;
              case 'neutral': suggestion = "Hitta en lätt uppgift för att bygga momentum. Färglägg en målarbok eller öva på en liten del av en låt. Små framsteg kan väcka intresset."; break;
            }
            break;
          case 'Tristess':
            switch (mood) {
              case 'good': suggestion = "Öka utmaningen med en ny teknik, ett nytt material eller ett mer stimulerande mål. Vad kan du lära dig som kopplar till detta?"; break;
              case 'sad': suggestion = "Försök hitta en ny vinkel som gör processen intressant. Kan du lägga till ett lekfullt element eller prova en annan genre?"; break;
              case 'happy': suggestion = "Kanalisera din positiva energi! Utmana dig själv att göra något du redan kan, men på ett nytt eller oväntat sätt."; break;
              case 'bad': suggestion = "Försök att omforma din kreativa idé. Kan du hitta ett litet delmål som känns mer meningsfullt att uppnå, som att bara välja palett?"; break;
              case 'neutral': suggestion = "Öka utmaningen med en ny teknik eller ett nytt, mer ambitiöst mål. Kanske kan du lära dig något nytt kopplat till ditt kreativa område?"; break;
            }
            break;
          case 'Avslappning':
            switch (mood) {
              case 'good': suggestion = "Reflektera över dina styrkor som kreatör. Hur kan du tillämpa dem för att ta dig an en meningsfull utmaning som leder till djupare engagemang?"; break;
              case 'sad': suggestion = "Fokusera på att bara vara. Kanske räcker det med att lyssna på en inspirerande podcast eller titta på andras verk, utan att skapa något själv."; break;
              case 'happy': suggestion = "Bygg vidare på den känslan genom att sätta ett lite mer utmanande men roligt mål. Kan du inspirera någon annan med din kreativitet?"; break;
              case 'bad': suggestion = "Fokusera på grundläggande självvård. Ta en paus och kom tillbaka till ditt kreativa projekt med ett lugnare sinne."; break;
              case 'neutral': suggestion = "Identifiera nästa steg och höj utmaningsnivån något. Kan du lägga till ett tidspressat moment eller ett nytt element?"; break;
            }
            break;
          case 'Oro':
            switch (mood) {
              case 'good': suggestion = "Använd din positiva inställning för att metodiskt bryta ner ditt kreativa projekt i små, hanterbara delar. Fira varje delmål!"; break;
              case 'sad': suggestion = "Bryt ner projektet i mikrosteg och fokusera på bara det allra första. Andas djupt och ta det lugnt."; break;
              case 'happy': suggestion = "Utnyttja din energi till att skapa en tydlig plan. Visualisera framgång för varje litet steg i projektet."; break;
              case 'bad': suggestion = "Fokusera på att bara ta ett enda litet steg som känns hanterbart. Glöm inte att vara snäll mot dig själv."; break;
              case 'neutral': suggestion = "Bryt ner ditt kreativa projekt i mindre, hanterbara delar och fokusera på en i taget. Glöm inte att fira små framsteg!"; break;
            }
            break;
          case 'Vardag':
            switch (mood) {
              case 'good': suggestion = "Fundera på hur du kan variera ditt kreativa uttryck eller lägga till ett lekfullt element. Kan du tävla mot dig själv för att öka engagemanget?"; break;
              case 'sad': suggestion = "Sök efter ett sätt att ge ditt kreativa uttryck lite mer mening eller att hitta en liten belöning efteråt."; break;
              case 'happy': suggestion = "Använd din glädje till att göra det kreativa projektet till en utmaning eller experimentera med nya metoder."; break;
              case 'bad': suggestion = "Försök att bryta rutinen, även om det är en liten ändring. Kan du ta en kort paus och sedan se projektet med nya ögon?"; break;
              case 'neutral': suggestion = "Fundera på hur du kan variera ditt kreativa uttryck. Kan du lägga till ett lekfullt element eller tävla mot dig själv?"; break;
            }
            break;
          case 'Kontroll':
            switch (mood) {
              case 'good': suggestion = "Hitta en del av din kreativitet du kan optimera ytterligare, eller sätt ett snävare tidsmål för att hålla dig skarp. Kan du hjälpa någon annan med din kunskap?"; break;
              case 'sad': suggestion = "Reflektera över vad som saknas trots din kontroll. Kan du hitta ett nytt, mer personligt mål med ditt kreativa projekt?"; break;
              case 'happy': suggestion = "Utmana dig själv att göra det ännu bättre, eller utforska hur du kan effektivisera processen ytterligare. Kanske kan du undervisa andra?"; break;
              case 'bad': suggestion = "Kanske är det dags att släppa lite på kontrollen och tillåta spontanitet, eller att delegera en del för att minska bördan."; break;
              case 'neutral': suggestion = "Hitta en del av din kreativitet som du kan göra ännu bättre, eller sätt ett snävare tidsmål. Kan du hjälpa någon annan med din kunskap?"; break;
            }
            break;
          case 'Ångest':
            switch (mood) {
              case 'good': suggestion = "Kanalisera den energin till en mycket enkel, trygg kreativ uppgift som du vet att du klarar av."; break;
              case 'sad': suggestion = "Minska utmaningsnivån drastiskt. Fokusera på något lugnande, som att rita en enda linje eller titta på inspirerande bilder."; break;
              case 'happy': suggestion = "Försök att identifiera källan till ångesten. Kan du omvandla den överväldigande energin till en liten, konkret handling?"; break;
              case 'bad': suggestion = "Prioritera att lugna ner dig först. En kort meditation eller en stund i tystnad kan hjälpa. Minska sedan utmaningen radikalt."; break;
              case 'neutral': suggestion = "Minska utmaningsnivån drastiskt och fokusera på det du redan kan. Ta en paus och kom tillbaka med ett lugnare sinne."; break;
            }
            break;
          case 'Upphetsning':
            switch (mood) {
              case 'good': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
              case 'sad': suggestion = "Försök att jorda dig själv och hitta en produktiv väg för den upphetsade energin, så att den inte blir överväldigande."; break;
              case 'happy': suggestion = "Använd denna höga energi för att ta dig an en utmanande men meningsfull kreativ uppgift. Sätt ett specifikt, mätbart mål."; break;
              case 'bad': suggestion = "Ta en stund att lugna systemet. När du känner dig mer stabil, kan du försöka kanalisera energin in i en strukturerad aktivitet."; break;
              case 'neutral': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
            }
            break;
          case 'Flow': suggestion = "Håll fokus, njut av processen och reflektera över vad som gör att det känns så här bra."; break;
        }
        break;
      case 'Lärande':
        switch (zone) {
          case 'Apati':
            switch (mood) {
              case 'good': suggestion = "Hitta ett meningsfullt och lätt ämne att fokusera på, kanske en kort videolektion eller en intressant artikel. Sätt inga krav."; break;
              case 'sad': suggestion = "Börja med något litet som kräver minimal ansträngning, som att läsa en mening eller en rubrik. Fokusera på att komma igång."; break;
              case 'happy': suggestion = "Använd din positiva energi! Hitta något du verkligen är nyfiken på, även om det är en liten uppgift."; break;
              case 'bad': suggestion = "Sök efter en enkel aktivitet som inte kräver mycket, fokusera på återhämtning först."; break;
              case 'neutral': suggestion = "Hitta en lätt uppgift att fokusera på för att bygga momentum. Små framsteg kan väcka intresset."; break;
            }
            break;
          case 'Tristess':
            switch (mood) {
              case 'good': suggestion = "Öka utmaningen i ditt lärande eller sätt upp ett nytt, mer stimulerande mål. Vad kan du lära dig som kopplar till detta?"; break;
              case 'sad': suggestion = "Försök hitta en ny vinkel på ämnet som gör det mer intressant. Kan du lägga till ett kreativt element, som en tankekarta eller en diskussion?"; break;
              case 'happy': suggestion = "Kanalisera din positiva energi! Utmana dig själv att bemästra en ny färdighet eller ett nytt ämne på ett nytt eller snabbare sätt."; break;
              case 'bad': suggestion = "Försök att omforma ditt lärande. Kan du hitta ett litet delmål som känns mer meningsfullt att uppnå, som att lära dig ett enda nytt ord?"; break;
              case 'neutral': suggestion = "Öka utmaningen i ditt lärande eller sätt upp ett mer ambitiöst mål. Kanske kan du lära dig något nytt kopplat till detta?"; break;
            }
            break;
          case 'Avslappning':
            switch (mood) {
              case 'good': suggestion = "Identifiera nästa steg och höj utmaningsnivån något för att hålla engagemanget uppe. Ett tidspressat moment eller ett nytt element kan hjälpa."; break;
              case 'sad': suggestion = "Tillåt dig att vara i det, men försök försiktigt att identifiera en liten, lättsam aktivitet som kan distrahera eller muntra upp dig."; break;
              case 'happy': suggestion = "Bygg vidare på den känslan genom att sätta ett lite mer utmanande men roligt mål. Kan du inspirera någon annan?"; break;
              case 'bad': suggestion = "Fokusera på grundläggande självvård. Kanske en kort stunds mindfulness eller en kopp te innan du funderar på nästa steg."; break;
              case 'neutral': suggestion = "Identifiera nästa steg och höj utmaningsnivån något. Kan du lägga till ett tidspressat moment eller ett nytt element?"; break;
            }
            break;
          case 'Oro':
            switch (mood) {
              case 'good': suggestion = "Använd din positiva inställning för att metodiskt bryta ner ditt lärande i små, hanterbara delar. Fira varje delmål!"; break;
              case 'sad': suggestion = "Bryt ner lärandet i mikrosteg och fokusera på bara det allra första. Andas djupt och ta det lugnt."; break;
              case 'happy': suggestion = "Utnyttja din energi till att skapa en tydlig plan. Visualisera framgång för varje litet steg i lärandet."; break;
              case 'bad': suggestion = "Fokusera på att bara ta ett enda litet steg som känns hanterbart. Glöm inte att vara snäll mot dig själv."; break;
              case 'neutral': suggestion = "Bryt ner lärandet i mindre, hanterbara delar och fokusera på en i taget. Glöm inte att fira små framsteg!"; break;
            }
            break;
          case 'Vardag':
            switch (mood) {
              case 'good': suggestion = "Fundera på hur du kan variera ditt lärande eller lägga till ett lekfullt element. Kan du tävla mot dig själv för att öka engagemanget?"; break;
              case 'sad': suggestion = "Sök efter ett sätt att ge ditt lärande lite mer mening eller att hitta en liten belöning efteråt."; break;
              case 'happy': suggestion = "Använd din glädje till att göra lärandet till en utmaning eller experimentera med nya metoder."; break;
              case 'bad': suggestion = "Försök att bryta rutinen, även om det är en liten ändring. Kan du ta en kort paus och sedan se lärandet med nya ögon?"; break;
              case 'neutral': suggestion = "Fundera på hur du kan variera ditt lärande. Kan du lägga till ett lekfullt element eller tävla mot dig själv?"; break;
            }
            break;
          case 'Kontroll':
            switch (mood) {
              case 'good': suggestion = "Hitta en del av ditt lärande du kan optimera ytterligare, eller sätt ett snävare tidsmål för att hålla dig skarp. Kan du hjälpa någon annan med din kunskap?"; break;
              case 'sad': suggestion = "Reflektera över vad som saknas trots din kontroll. Kan du hitta ett nytt, mer personligt mål med ditt lärande?"; break;
              case 'happy': suggestion = "Utmana dig själv att göra det ännu bättre, eller utforska hur du kan effektivisera processen ytterligare. Kanske kan du undervisa andra?"; break;
              case 'bad': suggestion = "Kanske är det dags att släppa lite på kontrollen och tillåta spontanitet, eller att delegera en del för att minska bördan."; break;
              case 'neutral': suggestion = "Hitta en del av ditt lärande som du kan göra ännu bättre, eller sätt ett snävare tidsmål. Kan du hjälpa någon annan med din kunskap?"; break;
            }
            break;
          case 'Ångest':
            switch (mood) {
              case 'good': suggestion = "Kanalisera den energin till en mycket enkel, trygg uppgift som du vet att du klarar av."; break;
              case 'sad': suggestion = "Minska utmaningsnivån drastiskt. Fokusera på något lugnande, som att andas djupt eller ta en kort paus innan du försöker igen."; break;
              case 'happy': suggestion = "Försök att identifiera källan till ångesten. Kan du omvandla den överväldigande energin till en liten, konkret handling?"; break;
              case 'bad': suggestion = "Prioritera att lugna ner dig först. En kort meditation eller en stund i tystnad kan hjälpa. Minska sedan utmaningen radikalt."; break;
              case 'neutral': suggestion = "Minska utmaningsnivån drastiskt och fokusera på det du redan kan. Ta en paus och kom tillbaka med ett lugnare sinne."; break;
            }
            break;
          case 'Upphetsning':
            switch (mood) {
              case 'good': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
              case 'sad': suggestion = "Försök att jorda dig själv och hitta en produktiv väg för den upphetsade energin, så att den inte blir överväldigande."; break;
              case 'happy': suggestion = "Använd denna höga energi för att ta dig an en utmanande men meningsfull uppgift. Sätt ett specifikt, mätbart mål för att omvandla energin till produktivitet."; break;
              case 'bad': suggestion = "Ta en stund att lugna systemet. När du känner dig mer stabil, kan du försöka kanalisera energin in i en strukturerad aktivitet."; break;
              case 'neutral': suggestion = "Kanalisera din energi genom att hitta en tydlig struktur eller ett konkret delmål. Vad är nästa steg att bemästra?"; break;
            }
            break;
          case 'Flow': suggestion = "Håll fokus, njut av processen och reflektera över vad som gör att det känns så här bra."; break;
        }
        break;
    }
    return suggestion;
  }
