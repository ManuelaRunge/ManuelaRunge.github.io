const coreTerms = /\b(malaria|ntds?|neglected tropical|leishmani\w*|filari\w*|onchocer\w*|trachoma|schistosom\w*|dengue|cholera|yellow fever|ebola|tuberculosis|measles|rabies|vaccin\w*|immunis\w*|immuniz\w*|vector.borne|epidemiolog\w*|epidemic\w*|outbreak|surveillance|stratif\w*|tailor\w*|modelling|modeling|forecast\w*|campaign effectiveness|health financing|health systems|health policy|climate.sensitive infectious|antimicrobial resistance)\b/i;
const secondaryTerms = /\b(public health|health impact|risk assessment|health programme|health program|global health|data analys\w*|statistical|reproducib\w*|research methods|health intervention|mathematical model|implementation research|disease elimination|disease control|drug development|clinical trial)\b/i;
const lowValue = /^(highlighted signals and events|learn more|read more|view all|skip to|homepage|home|news|latest news|events|resources|about us)$/i;
const exclude = /\b(entertainment|celebrity|concert|music video|blood donor campaign|director.general election|train accident)\b/i;
const trustedHosts = /(^|\.)(who\.int|dndi\.org|malariaconsortium\.org|ammnet\.org|gavi\.org|theglobalfund\.org|worldbank\.org|wellcome\.org|gatesfoundation\.org|ghitfund\.org|unicef\.org|pubmed\.ncbi\.nlm\.nih\.gov|ncbi\.nlm\.nih\.gov|campaigneffectiveness\.org)$/i;


export { coreTerms, secondaryTerms, lowValue, exclude, trustedHosts };
