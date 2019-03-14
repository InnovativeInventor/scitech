var documents=[{"id":0,"url":"/404.html","title":"404","body":"404 Page does not exist!Please use the search bar at the top or visit our homepage! "},{"id":1,"url":"/about","title":"About","body":"  ScienceScience helps humans understand the past, present, and future. SciTECH reports on current developments and their applications in any area of science including the fields of physics, chemistry, and biology. Through informative articles, we highlight and explore current research and innovations, their uses in society, and the future possibilities. Writing about science provides an opportunity for a writer to further his or her scientific knowledge through extensive research while also educating readers on news discussed throughout the world. TechnologyToday, technology is the largest growing field where innovators are always trying to make the next discovery. SciTECH seeks to inform readers of the latest innovations that are transforming society and research. The articles describe and analyze technological ideas and the impact on society and/or research. We focus on the components and function of technology as well as changes in the technology sector. Writers inform themselves of the latest technology and understand the need for innovation. Engineering Since the dawn of time, engineers have created pivotal technologies that have transformed the worlds of communications, healthcare, information technology, energy, business, and beyond. We aim to inform readers on recent developments in the field of engineering, as well as its relation to society and social adjustment. The articles explain how engineers have connected ideas in novel ways, integrated technological innovations into everyday life, and applied their discoveries to make the world a better place. With these objectives in mind, we hope to provide readers with a deeper understanding of the role of engineering in today’s world. CultureScience cannot be without critical intersections. No advancement in science, technology or engineering is without its own, sometimes profound, sometimes subtle, ramifications for society. The converse is also true for major political, economic, and civil events. Science, technology, and engineering do not operate in a vacuum, and are shaped by the world at large. In SciTECH, we explore these intersections. We seek to inform readers about the impact, by chance or by design, that the fields covered in other sections of SciTECH have on society and on readers’ lives. We also seek to inform readers of the means by which they can, in their personal and political decisions, consciously and inadvertently, affect the direction of science, technology, and engineering. HacksIn SciTECH, students can also showcase their newest projects and provide insight for readers embarking on a similar project. We include descriptions of fun STEM projects made by members of the Choate community and beyond, and tutorials for projects that readers can follow. This website is built using Jekyll, versioned using git, and deployed on AWS S3.   Contribute by emailing submissions to scitech@choate. eduOpen source on GitHub . Constitution"},{"id":2,"url":"/categories","title":"Categories","body":""},{"id":3,"url":"/","title":"Home","body":"      Featured:                                                               													                                                                                                                      Discovery of Superelastic Properties in Mammalian Epithelial Cells                              :                             In October 2018, Nature published a study titled “Active superelasticity in three-dimensional epithelia of controlled shape”1 which provided evidence for the appearance of cell superelasticity. . . :                                                                                                                                       Amanda Li '21                                04 Feb 2019                                                                                                                                                                                                      													                                                                                                                      Why Algorithmic Thinking is Important in Computer Science Education                              :                             Python is used as an introductory language for computer science classes in many schools. With its easily understandable syntax and compatibility with almost any computing. . . :                                                                                                                                       Zhi Wei Gan '19                                24 Oct 2018                                                                                                                                            All Stories:                                           		  			 										    	 		  		                            Discovery of Superelastic Properties in Mammalian Epithelial Cells              :       In October 2018, Nature published a study titled “Active superelasticity in three-dimensional epithelia of controlled shape”1 which provided evidence for the appearance of cell superelasticity in mammalian epithelial cells upon. . . :                                                                             Amanda Li '21                04 Feb 2019                                                                         		  			 										    	 		  		                            Stanford Researchers Identify Human Bone Stem Cells              :       In a study published on September 20, 2018, a team of researchers at the Stanford University of Medicine identified a multipotent human skeletal stem cell that gives rise to new. . . :                                                                             Anjali Mangla '20                30 Nov 2018                                                                         		  			 										    	 		  		                            Ferrofluids: The Magnetic Liquid Dancer              :       The 1900s brought about countless exciting inventions from all across the globe. Sometimes a little mysterious, many of these inventions were intriguing and versatile. One such invention was the ferrofluid,. . . :                                                                             Claire Yuan '21                30 Oct 2018                                                                         		  			 										    	 		  		                            Brain-on-a-Chip: Another One of the Organ-on-a-Chip Inventions              :       Bioengineering has rapidly evolved in the past decade, with novel technologies constantly introduced to study challenging subjects. A product of this era of rapid technological evolution, the “brain-on-a-chip” device was. . . :                                                                             Kate Spencer '20                27 Oct 2018                                                                         		  			 										    	 		  		                            Pinpointing Possible Treatments for Spinal Cord Injuries              :       The spinal cord is one of the most important parts of the body—it is essentially a bundle of nerves that runs down the back and carries signals back and forth. . . :                                                                             Archive                24 Oct 2018                                                                         		  			 										    	 		  		                            Puzzle in the Primes: Atiyah’s Attempt at the Riemann Hypothesis              :       Mathematics is constantly evolving under the eager minds of a vigorous and thriving research community. At the cornerstone of mathematics, particularly in number theory, are the prime numbers–natural numbers divisible. . . :                                                                             Sophie Vulpe '20                24 Oct 2018                                                          &laquo; Prev       1        2      Next &raquo; "},{"id":4,"url":"/issues","title":"Issues","body":""},{"id":5,"url":"/page2/","title":"Home","body":"{% if page. url == “/” %}       Featured:           {% for post in site. posts %}    {% if post. featured == true %}      {% include featuredbox. html %}    {% endif %}  {% endfor %}      {% endif %}             All Stories:               {% for post in paginator. posts %}        {% include postbox. html %}         {% endfor %}          {% include pagination. html %}"},{"id":6,"url":"/superelastic-mammalian-epithelial-cells/","title":"Discovery of Superelastic Properties in Mammalian Epithelial Cells","body":"2019/02/04 - In October 2018, Nature published a study titled “Active superelasticity in three-dimensional epithelia of controlled shape”1 which provided evidence for the appearance of cell superelasticity in mammalian epithelial cells upon undergoing extreme tension. Superelasticity, a property usually found in metallic alloys, is characterized by a cell’s ability to completely reverse large-scale deformations and elongate itself without increased force23. During this state, cells develop liquid-like properties and no longer become resistant to tension. In this study, mammalian epithelial cells were chosen because of their known ability to resist tension as well as their ability to pump water from their upper side to their lower side2. The water would then form a dome under the cells which would create tension and cause the cells to elongate (Figure 1a). During this process, some of the cells became superelastic, stretching to a wider cell surface than the elastic cells (Figure 1b). Adhesion junctions, the connecting area between cells, are the weakest points of pressure and eventually rupture from the increasing force. As a result, the water is able to escape from the dome which releases the tension from the cells (Figure 1c). Since none of the cells were in a state of plasticity, where irreversible damage can be done to the cellular shape3, all the cells return to their original, compacted position with superelastic cells appearing the same as other cells (Figure 1d). Previously, scientists believed cells under identical tension would have the same degree of shape deformation, but this experiment also shows that different cells have different thresholds for superelasticity. As shown in Figure 1, not all of the epithelial cells become superelastic at the same time, which researchers theorized was a result of the varied cellular mechanical properties (such as sensitivity to tension) of each cell2. Additionally, only under specific conditions can a cell enter a state of superelasticity. Cells that are placed under rapidly increasing pressure, even for a short duration, usually rupture while cells with slowly increasing pressure are able to maintain the dome structure for over hours2. Although this study has provided insight into a topic on which there was very limited understanding, there are still many questions left regarding cellular superelasticity. For one, there is still no definite reason as to why this occurs. Latorre et al. examined the connection between a cell’s cortex thickness and its superelastic threshold but there wasn’t substantial evidence supporting this hypothesis. The cell cortex is composed mainly of actin filaments, cytoskeletal filaments that maintain cellular structure and shape by relaying forces both within and between cells4. They hoped to show that cellular stretching resulted in the breaking apart of these filaments which would lead to a superelastic state, but the results didn’t show a direct correlation2. But, they were able to show the involvement of intermediate filaments, filaments that only provide mechanical strength to cells and are not involved in cellular movement1. When intermediate filaments in superelastic cells underwent laser ablation (essentially removing them), cell surface increased, which showed that they had resisted tension and were load-bearing (a theory that was suggested due to their unusually stiff structure in super-stretched cells)1. From this, they theorized that the weakness of the cortex induces support from the intermediate filaments and helps the cell elongate. The discovery of cellular elasticity has important implications on researching other cellular processes, such as the spreading and compaction of super-stretched embryonic tissue1 and can also lead to developments in cellular mechanics and engineering. By further examining cellular properties, mechanics, and processes like morphogenesis, we may reach a better understanding of what cellular elasticity is and how it impacts our world. References:       Latorre, E. , Kale, S. , Casares, L. , Gómez-González, M. , Uroz, M. , Valon, L. , . . . Trepat, X. (2018, 10). Active superelasticity in three-dimensional epithelia of controlled shape. Nature, 563(7730), 203-208. doi:10. 1038/s41586-018-0671-4 &#8617; &#8617;2 &#8617;3        Théry, M. , &amp; Asnacios, A. (2018, 10). Cellular stretch reveals superelastic powers. Nature, 563(7730), 192-194. doi:10. 1038/d41586-018-07172-9 &#8617; &#8617;2 &#8617;3 &#8617;4 &#8617;5        Yirka, B. (2018, 11). Researchers find that cells can at times have superelastic properties. Retrieved from Phys. org website: https://phys. org/news/2018-11-cells-superelastic-properties. html &#8617;        Cooper GM. The Cell: A Molecular Approach. 2nd edition. Sunderland (MA): Sinauer Associates; 2000. Intermediate Filaments. Available from: https://www. ncbi. nlm. nih. gov/books/NBK9834/ &#8617;    "},{"id":7,"url":"/stanford-stem-cell/","title":"Stanford Researchers Identify Human Bone Stem Cells","body":"2018/11/30 - In a study published on September 20, 2018, a team of researchers at the Stanford University of Medicine identified a multipotent human skeletal stem cell that gives rise to new bone or cartilage in the body. The implications of this study can lead to new regenerative treatments for fractures, arthritis, and bone injuries. Stem cells are cells that have not yet been differentiated and can self-renew for extremely long periods of time to keep their colonies intact. Once differentiated, stem cells become specialized cells required for regenerative therapy. These cells then differentiate into specialized cells called progenitor cells, which make up human tissues. The adult stem cell is lineage-restricted, meaning that it can give rise only to certain types of tissue like bone, cartilage, and stroma. The cell can also be isolated from human bone and even be generated from specialized cells in fat. They can also arise from induced pluripotent stem cells (iPSCs), a hot-topic technology in current stem cell research. The stem cell is found in increased quantities at the end of a developing bone or the site of a healing fracture. These stem cells are different from mesenchymal stem cells, which have had limited success in various clinical trials. Mesenchymal stem cells are isolated from the blood, bone marrow, and fat, and are considered to be all-purpose stem cells. However, these stem cells are very loosely characterized and may actually comprise of a large variety of cell populations, which may account for why they respond differently and unpredictably to differentiation signals. “In contrast, the skeletal stem cell we’ve identified possesses all of the hallmark qualities of true, multipotential, self-renewing, tissue-specific stem cells. They are restricted in terms of their fate potential to just skeletal tissues, which is likely to make them much more clinically useful,” said Charles K. F. Chan, PhD, assistant professor of surgery at Stanford. This study is a large advancement for stem cell research partly because it does not include ethical complications that are otherwise attached to the field of stem cell research. Pluripotent stem cells are usually derived from embryonic stem cells, which come from human embryos and exist only at early developmental stages. This stem cell, in contrast, bides its time in adult tissue until it differentiates. “There are 75 million Americans with arthritis, for example. Imagine if we could turn readily available fat cells from liposuction into stem cells that could be injected into their joints to make new cartilage, or if we could stimulate the formation of new bone to repair fractures in older people,” said Michael Longaker, MD, professor of plastic and reconstructive surgery at Stanford. Another implication of the study is that it provides a technological advantage convenient for researchers working with human hematopoietic stem cells–that is, the stem cells in human bone marrow that give rise to the blood and immune system. These skeletal stem cells don’t require growth factors in the serum used as the environment containing hematopoietic stem cells. Instead, they provide an environment where hematopoietic stem cells can thrive. The stromal population that arises from the skeletal cell can keep hematopoietic stem cells alive for two weeks without the need for additional serum. Researchers of the study also constructed a family tree of stem cells, which could be used in clinical applications and provide a way to understand the similarities and differences between mouse and human skeletal stem cells. This, in turn, may lead to discovery of key evolutionary differences between humans and mice. The researchers had used the mouse skeletal stem cell to locate and isolate the human skeletal stem cell by comparing gene expression profiles of the mouse skeletal stem cell with those of cell populations at the end of bones. “I would hope that, within the next decade or so, this cell source will be a game-changer in the field of arthroscopic and regenerative medicine,” Longaker noted. “If we can use this stem cell for relatively noninvasive therapies, it could be a dream come true. ” "},{"id":8,"url":"/ferrofluids/","title":"Ferrofluids: The Magnetic Liquid Dancer","body":"2018/10/30 - The 1900s brought about countless exciting inventions from all across the globe. Sometimes a little mysterious, many of these inventions were intriguing and versatile. One such invention was the ferrofluid, a substance that serves a variety of purposes in fields ranging from rocket science to school science fairs. Ferrofluids are commonly recognized as spiky liquids that “dance” under the influence of magnetic fields. Technically defined, ferrofluids are stable colloidal suspensions of superparamagnetic iron oxide nanoparticles. The magnetic property of ferrofluids derives from these tiny iron oxide particles. Because of these nanoparticles, ferrofluids do not stay magnetized after being removed from the presence of a magnetic field. Patented in 1965 by NASA chemist Steven Papell at the Lewis Research Center, ferrofluids were initially developed by scientists intending to facilitate the transfer of rocket fuel into a spacecraft’s engine. In space, the lack of gravity allows fuel to float within the holding tank and makes it difficult for the fuel to be efficiently pumped into the engine. Papell envisioned transforming the non-magnetic fuel into one that could be controlled and guided by the maneuvering of magnetic fields. Although Steven Papell’s idea was never practiced (as NASA preferred the use of solid rocket fuel to the concept of liquid magnetic fuel), it did incite the fervor to research this new magnetic substance. In fact, there was so much excitement surrounding ferrofluids that the mechanics of magnetic fluids was recognized as a new branch of science known as Ferrohydrodynamics. Even after the rapid development of solid rocket propulsion technology eliminated the need for magnetic fuel, ferrofluids did not leave the realm of rocket science. Only a few years after their invention, ferrofluids were reconsidered for use in rockets, but this time to manage the spacecraft’s temperature: the temperature of the side of the rocket facing the sun is significantly higher than that of the side in shadow, which can introduce problems to the spacecraft. 	More recently, it was also found that ferrofluids could improve speakers. In loudspeakers, electric energy is sent through a coil near the center of a circular permanent magnet. The current running through the coil induces a magnetic field, causing the coil to vibrate and produce an amplified sound. By coating the coil in a ferrofluid, engineers are able to dampen unwanted resonances and dispel excess heat from the coil. As a result, the speaker is able to have better sound quality. 	Nowadays, ferrofluids are being developed and tested for potential use in the biomedical field. Medical researchers are hopeful that with magnetic fields, medicine can be transferred quickly and easily through the human body. Ferrofluids are also being used in magnetic resonance imaging (MRI) techniques as contrast agents. 	In this fast-paced new era when inventions and innovations are constantly springing up from every corner, ferrofluids are no exception. Engineers and scientists in every field are coming up with more enhanced and creative ways to employ ferrofluids within their work. One could also say that ferrofluids are practically spiking up with unbridled potential! References: A Brief History of Ferrofluid. (2014, December 23). Retrieved October 12, 2018, from https://www. czferro. com/blog/2014/10/27/history-of-ferrofluids A. (2015, October 30). The Science Behind Ferrofluids. Retrieved October 12, 2018, from https://www. apexmagnets. com/news-how-tos/the-science-behind-ferrofluids/ Ferrofluid. (2008). Retrieved October 13, 2018, from https://archive. education. mrsec. wisc. edu/background/ferrofluid/index. html Lockney, D. (n. d. ). Magnetic Fluids Deliver Better Speaker Sound Quality. Retrieved October 13, 2018, from https://spinoff. nasa. gov/Spinoff2015/cg_2. html "},{"id":9,"url":"/brain-on-chip/","title":"Brain-on-a-Chip: Another One of the Organ-on-a-Chip Inventions","body":"2018/10/27 - Bioengineering has rapidly evolved in the past decade, with novel technologies constantly introduced to study challenging subjects. A product of this era of rapid technological evolution, the “brain-on-a-chip” device was created in 2018 by scientists of Lawrence Livermore National Laboratory (LLNL) in an attempt to determine the effects of chemicals, biological agents, disease, and pharmaceutical drugs on the brain. This device overrides any need for human or animal subjects, making its fabrication particularly significant for future neuroscience research. The complex neuronal plasticity and diverse cellular interaction of the human brain have previously obstructed the creation of an efficient brain-on-a-chip device, making LLNL’s research all the more impressive in its field. The device is essentially a wafer of semiconductors connected to a network of nanowires. To stimulate the central nervous system, the chip records neural activity from multiple brain cell types deposited and grown onto microelectrode arrays. The nanowires create functional neuronal circuits that represent the interconnectivity of neurons. The platform is a result of the lab’s in-vitro Chip-Based Human Investigation Platform project, or iCHIP. It is expected to increase understanding of how brain cells interact and combat disorders and to determine how exposure to chemical and biological weapons impacts the human mind. The chip is divided into four sections — three sub-regions and an external region representing the brain’s cortex — to best imitate the areas of the brain. Researchers then positioned primary hippocampal and cortical cells onto the electrodes corresponding to their orientation in the brain. To execute this feat, the scientists used custom-fabricated inserts that were removed after the cell placement to allow free interaction and communication within the regions. The electrical energy emitted by cells during communication, known as action potential patterns, were monitored over time. With this device, scientists hope to better understand the networks formed among various regions of the brain using only human-relevant data and without any animal testing. The device’s resultant data is meant to provide a more applicable model of how certain types of neurons react to chemical exposure and predict human response to countermeasures. Stated iCHIP co-lead author and LLNL research engineer Dave Soscia, “While we’re not close to the point where we can fully recapitulate a brain outside of the body, this is an important step in terms of increasing complexity of these devices and moving in the right direction. The idea is that eventually the community gets to a point where people are confident enough in the devices that the effects they see from putting chemicals or pharmaceutical drugs into the platform environment are similar to the results we would see in the human body. ” The technology also reveals how cells communicate in diverging ways when combined with or in close proximity to different cell types. Because the microscale, funnel-shaped insert does not require patterning its surface with different chemicals for cell adherence, it allows for the insert to be utilized on a variety of chip-platforms and cell types. “Here you literally just put an insert in, pipette the cells through the top of the insert, and it deposits them with precision onto specific regions on the electrode array. And because it’s removable, the cells adhere but they have nothing holding them back; they’re allowed to grow freely and communicate with the other regions,” added Soscia. “It was very important to us that we didn’t have physical barriers, so the cells could grow processes to interact and communicate. ” The “brain-on-a-chip” phenomenon began with researchers at Harvard’s School of Engineering and Applied Sciences in 2017 creating a device that indicated the communication differences between neurons coming from different parts of the brain. LLNL’s work represents the most recent application of the technology in studying the impact of long-term exposure to biological and chemical agents. In the future, LLNL will continue chip-based research as part of a strategic initiative focused on the brain under principal investigator Nick Fischer. Researchers aim to incorporate brain and blood-brain barrier chip platforms and eventually expand the ‘brain on a chip device’ to three-dimensions. To fully analyze and model the novel device’s data, the researchers hope to connect with computer-scientists and statisticians—and truly understand their extraordinary results. References: “Brain-on-a-chip” to test effects of biological and chemical agents, develop countermeasures. (2017, December 18). Retrieved from https://www. sciencedaily. com/releases/2017/12/171218092556. htm P. (2018, January 15). “Brain-on-a-chip” devices are changing how we study the brain. Retrieved from https://futurism. com/brain-chip-devices-changing-how-study-brain Meet Chip: Brain. (2018, March 30). Retrieved from https://ncats. nih. gov/tissuechip/chip/brain "},{"id":10,"url":"/spinal-cord-treatments/","title":"Pinpointing Possible Treatments for Spinal Cord Injuries","body":"2018/10/24 - The spinal cord is one of the most important parts of the body—it is essentially a bundle of nerves that runs down the back and carries signals back and forth between different parts of the body and brain. Spinal cord injuries (SCIs) disrupt these signals by damaging the spinal cord. The two kinds of spinal cord injuries—complete and incomplete—are categorized by the degree of damage done onto the spinal cord. Complete injury means the body is completely paralyzed below the injury, while an incomplete one entails some retainment of movement control and sensation below the injury. Prone to severe paralysis, SCIs are medical emergencies. With immediate medical treatment, long-term effects can be reduced. However, a wholly effective treatment does not exist at the moment, particularly regarding immediate restoration of motor and sensory function after the injury. This is due to a lack of understanding of the complex biological processes behind a spinal cord injury. To better understand this complex process, Skinnider and his research team integrated data from decades of smaller studies. They found that M3 group genes were most strongly linked to the severity of injury in both mice and rats. In fact, annexin A1, a gene in the M3 group, could perfectly differentiate between moderately and severely injured rats. Jordan Squair, a lead author of the study, concluded, “We have identified gene signatures that predict injury severity and, if reversed therapeutically, could potentially increase functional recovery. ” Another reason for the lack of fully effective treatment for SCIs is the absence of information regarding nerve regeneration in humans. Nerve regeneration is the ability of animals like frogs, dogs, whales, and snails to regrow nerves after an injury. Humans and primates, however, do not possess this ability. However, in an older study conducted at the Salk Institute of Biological Studies, it was found that the protein p45 promotes nerve regeneration by preventing the axon sheath from inhibiting regrowth. The problem is that humans, primates, and other advanced vertebrates lack this p45 protein; instead, they have the protein p75, which binds to the myelin when there is nerve damage. A newer study at the Salk Institute found that growth-promoting p45 could disrupt p75 pairing, which latches onto inhibitors released from the damaged myelin. Axons were able to grow with fewer p75 pairs available to bind to inhibitors. These findings implicate important therapeutic advancements. Introducing p45 protein to injured neurons or a small molecule that could jam the link between the p75 proteins could serve as a potential therapy to spinal cord damage. The next step will be to see if introducing p45 helps regenerate damaged human nerves. References: Mayo Clinic Staff. (n. d. ). Spinal cord injury. Retrieved October 13, 2018, from Mayo Clinic website: https://www. mayoclinic. org/diseases-conditions/spinal-cord-injury/diagnosis-treatment/drc-20377895 Squair, J. W. , Tigchelaar, S. , Moon, K. -M. , Liu, J. , Tetzlaff, W. , Kwon, B. K. , . . . Skinnider, M. A. (2018). Integrated systems analysis reveals conserved gene networks underlying response to spinal cord injury. eLIFE. https://doi. org/10. 7554/eLife. 39188 Vilar, M. , Sung, T. -C. , Chen, Z. , García-Carpio, I. , Fernandez, E. M. , Xu, J. , . . . Lee, K. -F. (2014). Heterodimerization of p45–p75 Modulates p75 Signaling: Structural Basis and Mechanism of Action. PLOS Biology. https://doi. org/10. 1371/journal. pbio. 1001918 "},{"id":11,"url":"/rienmann-hypothesis-atiyah/","title":"Puzzle in the Primes: Atiyah’s Attempt at the Riemann Hypothesis","body":"2018/10/24 - Mathematics is constantly evolving under the eager minds of a vigorous and thriving research community. At the cornerstone of mathematics, particularly in number theory, are the prime numbers–natural numbers divisible only by one and themselves. Recently, the mathematics community discovered a pattern in such numbers, attempting at a proof of the Riemann Hypothesis. One of the most famous unsolved mathematical problems in history, the hypothesis seeks to prove a special property of the Riemann function that can approximate the distribution of primes, given by a relationship between two functions: the prime-counting function π(x) and the Riemann zeta function. In 1859, mathematician Bernhard Riemann, presented a paper titled “On the Number of Prime Numbers Less Than a Given Quantity. ” At the heart of the paper was an explicit formula for the number of primes up to any predetermined limit, an improvement on the approximation of π(x). For this formula to hold true, the values at which the Riemann zeta function equals 0 must be known. The Riemann zeta function is defined as the analytic continuation of the series (s)=1+12s+13s+14s…, or (s)=n=11ns, for complex-valued s, which converges when the real part of s is greater than 1. Since the series does not converge and is thus undefined when the real part of s is less than 1, the zeta function is “constructed” through a process called analytic continuation on the entire complex plane. This process extends the series from its defined values so that all of its higher derivatives exist, are continuous, and hence “analytic. ” For all negative even integers (-2, -4, -6, etc. ), (s)=0 ; these values are called trivial zeros. The primary focus of the Riemann Hypothesis deals with the infinite number of non-trivial zeros and claims the following: all non-trivial zeros have a real part equal to 12 (i. e. all non-trivial zeros can be expressed in the form 12+yi, where i =-1. )While values of s within a magnitude of 1013 have computationally been tested to agree with the assertion of the Riemann zeta function, the Riemann Hypothesis has yet to be proven in its general form. For years, many attempted to prove or disprove the assertion, but none has succeeded. This past month, at the Heidelberg Laureate Forum (HLF), Sir Michael Atiyah presented his attempt at proving the original Riemann Hypothesis. In his 45-minute lecture, he described how a seemingly unrelated concept in physics–the fine structure constant, which describes the strength and nature of electromagnetic interactions between charged particles–was the key to proving the Riemann Hypothesis. The two concepts are supposedly related by the Todd Function, introduced in Atiyah’s paper “The Fine Structure Constant. ” There, Atiyah introduced certain properties of the Todd function including analyticity on all compact sets of the complex plane. However interesting this connection seems, though, the claim was met by much skepticism from the mathematical community. To his critics, Atiyah responded, “Nobody believes any proof of the Riemann Hypothesis, let alone by someone who’s 90,” remaining adamant about the veracity of his proof. Still, the verdict seems unlikely to come out in his favor. A large part of his theoretical work lies in his proof to the Proceedings of the Royal Society A that has yet to be published. As of the writing of this article, no definitive response to Atiyah’s proof has been published, but the general consensus appears to be that his proof is, at the very least, flawed. While this “proof” may not be the ultimate solution to the Riemann Hypothesis, Atiyah’s shortcomings still provide the opportunity of an open problem for the mathematical community. For the next generation of mathematicians, this problem may entail advances in the discovery of the distribution of the primes and better cryptography techniques. With advances in mathematical machineries, we may see a solid proof of the hypothesis in the next few decades. References: Heidelberg Laureate Forum. (2018, September 24). 6th HLF - Lecture: Sir Michael Francis Atiyah [Video file]. Retrieved from http://www-history. mcs. st-andrews. ac. uk/Biographies/Atiyah. html O’Connor, J. J. , &amp; Robertson, E. F. (n. d. ). Michael Francis Atiyah. Retrieved October 12, 2018, from MacTutor History of Mathematics Archive website: http://www-history. mcs. st-andrews. ac. uk/Biographies/Atiyah. html Riemann Hypothesis. (n. d. ). Retrieved October 12, 2018, from Clay Mathematics Institute website: http://www. claymath. org/millennium-problems/riemann-hypothesis Riemann Hypothesis. (n. d. ). Retrieved October 12, 2018, from Encyclopaedia Britannica website: https://www. britannica. com/science/Riemann-hypothesis Schembri, F. (2018, September 24). Skepticism Surrounds Renowned Mathematician‘s Attempted Proof of 160-Year-Old Hypothesis. Science. Retrieved from https://www. sciencemag. org/news/2018/09/skepticism-surrounds-renowned-mathematician-s-attempted-proof-160-year-old-hypothesis "},{"id":12,"url":"/bendable-phone-tech/","title":"Exciting Developments in Bendable Phone Technology","body":"2018/10/24 - An iPhone bent around your wrist to become an Apple Watch. A touch screen car display curved across the entire dashboard. An iPad rolled up and slid into your pocket. Thanks to new bendable electronics technology invented by scientists at the Australian National University and experimental designs created by smartphone companies, these futuristic gadgets may not be that far away. On October 5th, scientists from the ANU Research School of Engineering reported that they invented a thin, flexible semiconductor that could retain the efficiency of light conversion to electricity. Associate Professor Lu stated, “For the first time, we have developed an ultra-thin electronics component with excellent semiconducting properties that is an organic-inorganic hybrid structure and thin and flexible enough for future technologies, such as bendable mobile phones and display screens. ”The semiconductor’s small width can be attributed to its hybrid structure: a one-atom-thick organic component paired with a two-atom-thick inorganic component. This hybrid structure enables the semiconductor to emit precise light beams to produce high quality images. According to PhD student Ankur Sharma, “The light emission from our semiconducting structure is very sharp, so it can be used for high-resolution displays and, since the materials are ultra-thin, they have the flexibility to be made into bendable screens and mobile phones in the near future. ”The scientists also reported that the semiconductor is much faster than conventional smartphone semiconductors made only of inorganic materials like silicon. According to Mr. Sharma, there is “potential with this semiconductor to make mobile phones as powerful as today’s supercomputers. ” Moreover, because of the organic component, the new semiconductor is now biodegradable and recyclable. The technology’s environmental benefits make the invention highly desirable in a world where the amount of global e-waste is projected to reach 49. 8 million tons this year. This new invention arrives as major smartphone companies – including Apple, Samsung, and LG – have begun filing patents for designs and prototypes of bendable phones. These designs capitalize on the flexibility of OLED displays, the most common type of display used as the screen for every major flagship phone. These displays emit their own light, meaning they do not require a backlight to illuminate them so that they may be fastened to flexible plastics. However, smartphone screens are not flexible in spite of their OLED screens because these screens are trapped inside robust metal cases. The main issue with creating a bendable phone is that not only the screen has to be flexible but also the other components of the phone. Phone batteries, in particular, are extremely difficult to bend. Among the prototypes for flexible phones, Samsung has created one of the more notable designs. Samsung’s patent describes a 7. 3-inch OLED display encased inside a metal frame with a hinge. The diagrams included in the patent show the phone opening and closing like a notebook. When the screen reaches the completely open and closed states, a locking and unlocking mechanism solidifies the screen to prevent the phone from collapsing in the user’s hand. At the launch of the Samsung Galaxy A9, CEO Dong Jin Koh announced that the device will be able to be unfolded to a fully-functioning tablet with multitasking capabilities and then folded back to a portable phone. Due to the flexibility of the screen, the phone is also reported to be virtually unbreakable. In July of this year, the phone was certified by Underwriters Laboratories to be able to survive several rigorous drop tests and temperature tests based on military standards set by the US Department of Defense without any damage or impact on functionality. However, the most exciting news from Samsung is that these new designs will be used to build the screen for the Samsung Galaxy X, the next flagship phone for the company set to be released next year. According to Mr. Koh, “When we deliver a foldable phone, it has to be really meaningful to our customer… If the user experience is not up to my standard, I don’t want to deliver those kind of products. ”In addition to Samsung, LG has also filed a patent for the design of foldable phone. However, LG’s phone, unlike the Samsung Galaxy X, folds vertically instead of horizontally. The patent focuses on the phone’s hinge mechanism, which extends the device’s outer side as the phone folds to reduce stress and pressure on the screen. Each edge of the phone also contains magnets that keep the phone closed when folded, as well as a microphone, speaker, and antenna. This suggests that users could use the phone from both orientations. The camera, on the other hand, is placed near the center of the device, next to the hinge. This camera placement corresponds to another diagram in the patent paperwork that shows a user with the phone folded over his front shirt pocket like a pocket protector and the camera centered on the front-facing side of the phone. LG likely intended the phone to be clamped onto the front pocket for hands-free video recording. Bendable electronics are expected to be the future of the smartphone industry and the consumer electronics industry. Phone companies like Samsung and LG are already creating innovative and futuristic designs, while research laboratories in institutes like the Australian National Universities invent new and improved bendable technologies. Hopefully, these new bendable electronics will be able to live up to their full potential in the near future. References: ANU College of Engineering &amp; Computer Science. (2018, October 04). Part-organic invention can be used in bendable mobile phones. Retrieved October 13, 2018, from https://cecs. anu. edu. au/news/part-organic-invention-can-be-used-bendable-mobile-phones Lam, S. (2017, November 24). Global E-waste To Hit 49. 8M Tons By 2018 – Here’s What Japan Is Doing To Combat It. Retrieved October 13, 2018, from https://www. forbes. com/sites/lamsharon/2017/11/23/global-e-waste-to-hit-49-8m-tons-by-2018-heres-what-japan-is-doing-to-combat-it/ Porter, J. (2018, October 12). Samsung says its foldable phone is also a tablet that fits in your pocket. Retrieved October 13, 2018, from https://www. theverge. com/circuitbreaker/2018/10/12/17967078/samsung-foldable-phone-tablet-galaxy-x Torres, J. (2018, July 05). LG foldable phone patent has some interesting twists. Retrieved October 13, 2018, from https://www. slashgear. com/lg-foldable-phone-patent-has-some-interesting-twists-05536542/ "},{"id":13,"url":"/algorithimic-thinking-education/","title":"Why Algorithmic Thinking is Important in Computer Science Education","body":"2018/10/24 - Python is used as an introductory language for computer science classes in many schools. With its easily understandable syntax and compatibility with almost any computing environment, Python is the perfect language for new programmers. Other languages like C or C++ are not suitable for introductory courses as they vary across platforms, which makes it hard for instructors to teach a large class without hiccups. Even Donald Knuth, a renowned computer scientist, remarked, “C++ is too complicated. At the moment, it’s impossible for me to write portable code that I believe would work on lots of different systems, unless I avoid all exotic features. ” He further commented that “to think of programming in C++” “would make him physically ill. ” However, for those who decide that an introductory computer science course is sufficient for what they plan to do in life, learning how to use Python through project-based work should not be the focus of their education. There’s a simple reason for this: programming languages change over time, so there is a high chance that code written 10 years ago would no longer run on a new version of the same programming language. Because of this, using class time to teach the syntax or advanced features of any language is not a productive use of time in an introductory course. Instead, the reason for using Python as a primary language should be that it’s the optimal language for algorithmic thinking. Teaching algorithmic thinking allows students to practice logical thinking. To understand what algorithmic thinking is, one must first define what an algorithm is. According to the Oxford Dictionary, an algorithm is “a process or set of rules to be followed in calculations or other problem-solving operations. ” Learning why those sets of rules are in place is the core of algorithmic thinking, for students would be able to create and apply their own algorithms without having to rely on code they found online. As a result, students would be less reliant on other sources of help, such as the Internet. Outside of programming, algorithmic thinking has many applications. Divide and conquer, an algorithmic technique with applications ranging from sorting to proving mathematical claims, can be used to accomplish tasks in an organized and methodical manner. Using the task of “getting into your dream college” as an example, one could divide it up into smaller subproblems, like “getting better grades” and “starting a club. ” Each one of these subproblems could then further be divided into more specific goals. These “mini-goals,” which are achievable within an immediate frame of time, include “doing homework during study hours” or “hanging out with Bob after the test, not before. ” Another algorithmic technique, dynamic programming also has real-life applications outside computer science and mathematics. A well-known dynamic programming problem is: If there are P items in a bucket and each of them has a price Q and size R, which items should one take to fit in a bag of size S such that they maximize the value of items in the bag? Contrary to intuition, progressively taking the items with the highest value would not yield maximum profits. This is because taking several smaller items with a smaller value can lead to a higher net value than taking one very large but costly item. The same concept can be applied to real life. The ‘greediest’ option might not be the best option. For example, continuously taking the shortest paths to get from point A to point B would clearly not yield the shortest path. With a focus on algorithmic thinking, students would not only be more autonomous within the realm of computer science but also use this acquired skill set outside of class even for ideas that are simply intuitive. In this way, algorithms improve not only computers but hopefully also our daily lives. "},{"id":14,"url":"/honey-bee-memory/","title":"Honey Bees: Prime Models For Memory Storage and Alzheimer’s","body":"2017/12/25 - In an effort to further understand the long-term development of memory and memory impairment diseases, researchers at the University of Queensland in Australia recently used honeybees to uncover the impact of DNA methylation. By examining the presence and significance of DNA methylation, the study found that this particular epigenetic process does in fact affect the way a honeybee’s brain remembers and relearns. The study, conducted by Dr. Stephanie Biergans, depicted that certain molecular mechanisms that regulate memory specification and relearning could have a significant impact on the ways experiences are integrated into long-term memory. Biergans states, “There is thought to be a genetic predisposition for some conditions, such as Alzheimer’s and dementia, but in many cases environmental factors determine whether the disease will manifest. ” The researchers aim to use honeybees in order to discover more about molecular and environmental changes that lead to memory impairment diseases. Although honeybees may appear to be a questionable parallel to Alzheimer’s patients, they are valid models for helping researchers discover more behind the disease’s cause. “Honeybees have an amazing capacity to learn and remember,” says Biergans. “They can count up to four, and orientate themselves by learning patterns and landmarks. They are also social insects that interact, teach, and learn, making them successful foragers. Bees remember how to find a food source, how good the source was, and how to return to the hive. ” Because they can form complex memories like humans but have a simple brain structure, honeybees have become a prime model for researching the formulation of long term memories. Researchers in the past have established that Alzheimer’s disease and memory formation are partly controlled by molecular changes in the brain’s chemistry. As the DNA makeup is altered, physical changes may occur, including differing or new neutral activity and connections. Epigenetic mechanisms, which are a series of molecular changes that can occur due to experience or environmental changes, are known to affect memory formation in humans. They regulate gene expression through DNA modification without changing the individual gene. The Australian research team wanted to determine if DNA methylation, an epigenetic process, had an impact on how honeybees learn and relearn data. Based on what is needed, methylation can make a certain gene stay active or inactive. Biergans added, “We knew that DNA methylation is an epigenetic process that occurs in the brain and is related to memory formation. When we block this process in honeybees, it affects how they remember. ” The experiment involved two separate groups of honeybees, both of which were taught to expect sugar in the presence of a particular scent. The first group learned over an extended period of time; however, the second group was only exposed to the scent once. As explained by the research team, they taught the bees, “to associate an odor with a sugar reward, similar to the olfactory learning taking place when a bee collects nectar from a flower during foraging. ” Then they blocked DNA methylation in a few bees in each group using an inhibitor compound. After evaluating both groups with and without DNA methylation, the scientists changed the smell and repeated the process in order to find stable and ongoing conclusions. The University of Queensland’s researchers ultimately found that DNA methylation plays a significant role in defining how a bee can relearn. “When the bees were presented with sugar and a smell many times together, the presence of DNA methylation increased memory specificity they were less responsive to a novel odor,” summarizes Biergans. “On the other hand, when only introduced to the combination once, DNA methylation decreased specificity. ” The results reflect how a honeybee gets and chooses its source of nourishment; when a flower continuously proves to be a proficient source of food, the bees will search for that specific smell. Bees that were not able to methylate were not able to form memories that were as strong or specified as the bees that did methylate. Through this process, the scientists have discovered information that may allow them to provide treatments for brain diseases in the future. The simple mind of a honeybee has proven to be an accurate and helpful model in understanding the processes behind long-term memory formation. Linking the physical changes in neural connections to human brains could uncover the mystery behind conditions like dementia and Alzheimer’s. Future research is expected to build of of Biergans’ study. Researchers are hopeful to expand the scientists’ findings. Biergans states, “By understanding how changes to the epigenome accumulate, manifest, and influence brain function, we may, in the future, be able to develop treatments for brain diseases that also develop over a lifetime. ” "},{"id":15,"url":"/meteor-shower-sing/","title":"Making Meteor Showers Sing","body":"2016/05/16 - meteor-sky. jpg For centuries skywatchers have reported hearing a sound as a meteor visibly passed overhead. Professional astronomers, however, consistently dismissed the possibility of a meteor being seen and heard simultaneously based on the physics of sound and light. Particles from asteroids or comets that enter the Earth’s atmosphere is traveling at very high speeds and the friction generated by moving against air particles heats these meteors. Consequently, most meteors vaporize and create the sought after shooting star streaking across the sky. Yet sound travels much more slowly than light does. Disintegrating meteors visible to an observer on Earth’s surface are typically 60 miles above the planet’s surface. Thus a meteor would not possibly be heard until approximately five minutes after having been sighted. Given this reasoning, when a fireball passed over England in 1719, astronomer Edmond Halley (who calculated the orbit of the eponymous Halley’s Comet) concluded that reports of “hearing it hiss as it went along, as if it had been near at hand” had to be “the effect of pure fantasy”. Yet the phenomenon continued and reports from meteor listeners accumulated. Astronomers now understand that observers reporting hissing, sizzling or buzzing sounds during meteor showers are not delusional but rather are likely experiencing electrophonic sounds. In addition to releasing electromagnetic radiation in the visible portion of the spectrum, meteors release very low frequency (VLF) radio waves, which travel at the speed of light. Humans cannot directly hear these radio waves which oscillate at audio frequencies between a few kilohertz and 30 kilohertz. But in the presence of a physical object acting as a transducer, VLF radiation is converted into sound waves that a human ear can detect. Colin Keay, a physicist at the University of Newcastle in Australia during the 1970s, showed in a laboratory study that radio waves can induce low-frequency currents and rustling sounds in ordinary objects, even wire-framed eye glasses. He hypothesized that when the magnetic fields in the glowing trail of a meteor are permeated by Earth’s magnetic field a potential source of energy for VLF waves is created. Researchers tested Keay’s hypothesis and found that distinct VLF electromagnetic pulses were produced during the Leonid meteor shower of November 1999. Recently Dave Prochnow described how a person could hack an old stereo receiver in order to cause an audible spike in signal reception when a meteor passes overhead. In this case, the hacker is using the radio and a good FM antenna to pick up the signal of a distant FM radio station whose strength has been augmented when reflected by the ionized trail of a meteor. Although mechanistically very different from Keay’s documentation of electrophonics, this hack attempts to achieve the similar phenomenon of “hearing” meteors. In fact, radio engineers regularly monitor for “meteor echoes” by detecting TV signals that are reflected from meteor trails and “radio meteors” by detecting radio signals that bounce off the ionized gases produced by disintegrating meteoroids. In both cases, listeners can hear a brief “ping” on the receiver’s speaker when a meteor passes by with the correct geometry. In addition to detecting the many meteors that are too dim for the human eye to see, radio observing is advantageous because meteors can be detected 24 hours a day and even when skies are cloudy. The International Meteor Organization and the North American Meteor Network list dozens of meteor showers that are monitored almost exclusively by radio observations and not detected by their visual counterparts. Often these are “daylight meteor showers”. Radio observation, however, provides no information to the listener regarding where the meteor came from. Experienced visual observers can discriminate the direction or constellation from which a meteor emanates but radio detection cannot. Prochnow’s published instructions appear in the November 2014 issue of Popular Science under the title of “Listen in on a Meteor Shower: How to Repurpose Your Old Radio to Listen to Meteor Showers”. In addition to a stereo receiver and an FM Yagi antenna, the hacker needs to have downloaded Radio-SkyPipe II software on a computer. Making meteors sing seems to be a good candidate for a collaborative project between Astronomy Club and STEM Club. Let’s hope it’s coming soon to a Science Center roof near you. "}];var idx=lunr(function(){this.ref('id')
this.field('title')
this.field('body')
documents.forEach(function(doc){this.add(doc)},this)});function lunr_search(term){document.getElementById('lunrsearchresults').innerHTML='<ul></ul>';if(term){document.getElementById('lunrsearchresults').innerHTML="<p>Search results for '"+term+"'</p>"+document.getElementById('lunrsearchresults').innerHTML;var results=idx.search(term);if(results.length>0){for(var i=0;i<results.length;i++){var ref=results[i]['ref'];var url=documents[ref]['url'];var title=documents[ref]['title'];var body=documents[ref]['body'].substring(0,160)+'...';document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML=document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML+"<li class='lunrsearchresult'><a href='"+url+"'><span class='title'>"+title+"</span><br /><span class='body'>"+body+"</span><br /><span class='url'>"+url+"</span></a></li>";}}else{document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML="<li class='lunrsearchresult'>No results found...</li>";}}
return false;}
function lunr_search(term){$('#lunrsearchresults').show(400);$("body").addClass("modal-open");document.getElementById('lunrsearchresults').innerHTML='<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';if(term){document.getElementById('modtit').innerHTML="<h5 class='modal-title'>Search results for '"+term+"'</h5>"+document.getElementById('modtit').innerHTML;var results=idx.search(term);if(results.length>0){for(var i=0;i<results.length;i++){var ref=results[i]['ref'];var url=documents[ref]['url'];var title=documents[ref]['title'];var body=documents[ref]['body'].substring(0,160)+'...';document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML=document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML+"<li class='lunrsearchresult'><a href='"+url+"'><span class='title'>"+title+"</span><br /><small><span class='body'>"+body+"</span><br /><span class='url'>"+url+"</span></small></a></li>";}}else{document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML="<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";}}
return false;}
$(function(){$("#lunrsearchresults").on('click','#btnx',function(){$('#lunrsearchresults').hide(5);$("body").removeClass("modal-open");});});;(function(){var lunr=function(config){var builder=new lunr.Builder
builder.pipeline.add(lunr.trimmer,lunr.stopWordFilter,lunr.stemmer)
builder.searchPipeline.add(lunr.stemmer)
config.call(builder,builder)
return builder.build()}
lunr.version="2.1.5"/*!
* lunr.utils
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.utils={}
lunr.utils.warn=(function(global){return function(message){if(global.console&&console.warn){console.warn(message)}}})(this)
lunr.utils.asString=function(obj){if(obj===void 0||obj===null){return ""}else{return obj.toString()}}
lunr.FieldRef=function(docRef,fieldName,stringValue){this.docRef=docRef
this.fieldName=fieldName
this._stringValue=stringValue}
lunr.FieldRef.joiner="/"
lunr.FieldRef.fromString=function(s){var n=s.indexOf(lunr.FieldRef.joiner)
if(n===-1){throw "malformed field ref string"}
var fieldRef=s.slice(0,n),docRef=s.slice(n+1)
return new lunr.FieldRef(docRef,fieldRef,s)}
lunr.FieldRef.prototype.toString=function(){if(this._stringValue==undefined){this._stringValue=this.fieldName+lunr.FieldRef.joiner+this.docRef}
return this._stringValue}
lunr.idf=function(posting,documentCount){var documentsWithTerm=0
for(var fieldName in posting){if(fieldName=='_index')continue
documentsWithTerm+=Object.keys(posting[fieldName]).length}
var x=(documentCount-documentsWithTerm+0.5)/(documentsWithTerm+0.5)
return Math.log(1+Math.abs(x))}
lunr.Token=function(str,metadata){this.str=str||""
this.metadata=metadata||{}}
lunr.Token.prototype.toString=function(){return this.str}
lunr.Token.prototype.update=function(fn){this.str=fn(this.str,this.metadata)
return this}
lunr.Token.prototype.clone=function(fn){fn=fn||function(s){return s}
return new lunr.Token(fn(this.str,this.metadata),this.metadata)}/*!
* lunr.tokenizer
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.tokenizer=function(obj){if(obj==null||obj==undefined){return[]}
if(Array.isArray(obj)){return obj.map(function(t){return new lunr.Token(lunr.utils.asString(t).toLowerCase())})}
var str=obj.toString().trim().toLowerCase(),len=str.length,tokens=[]
for(var sliceEnd=0,sliceStart=0;sliceEnd<=len;sliceEnd++){var char=str.charAt(sliceEnd),sliceLength=sliceEnd-sliceStart
if((char.match(lunr.tokenizer.separator)||sliceEnd==len)){if(sliceLength>0){tokens.push(new lunr.Token(str.slice(sliceStart,sliceEnd),{position:[sliceStart,sliceLength],index:tokens.length}))}
sliceStart=sliceEnd+1}}
return tokens}
lunr.tokenizer.separator=/[\s\-]+//*!
* lunr.Pipeline
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.Pipeline=function(){this._stack=[]}
lunr.Pipeline.registeredFunctions=Object.create(null)
lunr.Pipeline.registerFunction=function(fn,label){if(label in this.registeredFunctions){lunr.utils.warn('Overwriting existing registered function: '+label)}
fn.label=label
lunr.Pipeline.registeredFunctions[fn.label]=fn}
lunr.Pipeline.warnIfFunctionNotRegistered=function(fn){var isRegistered=fn.label&&(fn.label in this.registeredFunctions)
if(!isRegistered){lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n',fn)}}
lunr.Pipeline.load=function(serialised){var pipeline=new lunr.Pipeline
serialised.forEach(function(fnName){var fn=lunr.Pipeline.registeredFunctions[fnName]
if(fn){pipeline.add(fn)}else{throw new Error('Cannot load unregistered function: '+fnName)}})
return pipeline}
lunr.Pipeline.prototype.add=function(){var fns=Array.prototype.slice.call(arguments)
fns.forEach(function(fn){lunr.Pipeline.warnIfFunctionNotRegistered(fn)
this._stack.push(fn)},this)}
lunr.Pipeline.prototype.after=function(existingFn,newFn){lunr.Pipeline.warnIfFunctionNotRegistered(newFn)
var pos=this._stack.indexOf(existingFn)
if(pos==-1){throw new Error('Cannot find existingFn')}
pos=pos+1
this._stack.splice(pos,0,newFn)}
lunr.Pipeline.prototype.before=function(existingFn,newFn){lunr.Pipeline.warnIfFunctionNotRegistered(newFn)
var pos=this._stack.indexOf(existingFn)
if(pos==-1){throw new Error('Cannot find existingFn')}
this._stack.splice(pos,0,newFn)}
lunr.Pipeline.prototype.remove=function(fn){var pos=this._stack.indexOf(fn)
if(pos==-1){return}
this._stack.splice(pos,1)}
lunr.Pipeline.prototype.run=function(tokens){var stackLength=this._stack.length
for(var i=0;i<stackLength;i++){var fn=this._stack[i]
tokens=tokens.reduce(function(memo,token,j){var result=fn(token,j,tokens)
if(result===void 0||result==='')return memo
return memo.concat(result)},[])}
return tokens}
lunr.Pipeline.prototype.runString=function(str){var token=new lunr.Token(str)
return this.run([token]).map(function(t){return t.toString()})}
lunr.Pipeline.prototype.reset=function(){this._stack=[]}
lunr.Pipeline.prototype.toJSON=function(){return this._stack.map(function(fn){lunr.Pipeline.warnIfFunctionNotRegistered(fn)
return fn.label})}/*!
* lunr.Vector
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.Vector=function(elements){this._magnitude=0
this.elements=elements||[]}
lunr.Vector.prototype.positionForIndex=function(index){if(this.elements.length==0){return 0}
var start=0,end=this.elements.length/2,sliceLength=end-start,pivotPoint=Math.floor(sliceLength/2),pivotIndex=this.elements[pivotPoint*2]
while(sliceLength>1){if(pivotIndex<index){start=pivotPoint}
if(pivotIndex>index){end=pivotPoint}
if(pivotIndex==index){break}
sliceLength=end-start
pivotPoint=start+Math.floor(sliceLength/2)
pivotIndex=this.elements[pivotPoint*2]}
if(pivotIndex==index){return pivotPoint*2}
if(pivotIndex>index){return pivotPoint*2}
if(pivotIndex<index){return(pivotPoint+1)*2}}
lunr.Vector.prototype.insert=function(insertIdx,val){this.upsert(insertIdx,val,function(){throw "duplicate index"})}
lunr.Vector.prototype.upsert=function(insertIdx,val,fn){this._magnitude=0
var position=this.positionForIndex(insertIdx)
if(this.elements[position]==insertIdx){this.elements[position+1]=fn(this.elements[position+1],val)}else{this.elements.splice(position,0,insertIdx,val)}}
lunr.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude
var sumOfSquares=0,elementsLength=this.elements.length
for(var i=1;i<elementsLength;i+=2){var val=this.elements[i]
sumOfSquares+=val*val}
return this._magnitude=Math.sqrt(sumOfSquares)}
lunr.Vector.prototype.dot=function(otherVector){var dotProduct=0,a=this.elements,b=otherVector.elements,aLen=a.length,bLen=b.length,aVal=0,bVal=0,i=0,j=0
while(i<aLen&&j<bLen){aVal=a[i],bVal=b[j]
if(aVal<bVal){i+=2}else if(aVal>bVal){j+=2}else if(aVal==bVal){dotProduct+=a[i+1]*b[j+1]
i+=2
j+=2}}
return dotProduct}
lunr.Vector.prototype.similarity=function(otherVector){return this.dot(otherVector)/(this.magnitude()*otherVector.magnitude())}
lunr.Vector.prototype.toArray=function(){var output=new Array(this.elements.length/2)
for(var i=1,j=0;i<this.elements.length;i+=2,j++){output[j]=this.elements[i]}
return output}
lunr.Vector.prototype.toJSON=function(){return this.elements}/*!
* lunr.stemmer
* Copyright (C) 2017 Oliver Nightingale
* Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
*/
lunr.stemmer=(function(){var step2list={"ational":"ate","tional":"tion","enci":"ence","anci":"ance","izer":"ize","bli":"ble","alli":"al","entli":"ent","eli":"e","ousli":"ous","ization":"ize","ation":"ate","ator":"ate","alism":"al","iveness":"ive","fulness":"ful","ousness":"ous","aliti":"al","iviti":"ive","biliti":"ble","logi":"log"},step3list={"icate":"ic","ative":"","alize":"al","iciti":"ic","ical":"ic","ful":"","ness":""},c="[^aeiou]",v="[aeiouy]",C=c+"[^aeiouy]*",V=v+"[aeiou]*",mgr0="^("+C+")?"+V+C,meq1="^("+C+")?"+V+C+"("+V+")?$",mgr1="^("+C+")?"+V+C+V+C,s_v="^("+C+")?"+v;var re_mgr0=new RegExp(mgr0);var re_mgr1=new RegExp(mgr1);var re_meq1=new RegExp(meq1);var re_s_v=new RegExp(s_v);var re_1a=/^(.+?)(ss|i)es$/;var re2_1a=/^(.+?)([^s])s$/;var re_1b=/^(.+?)eed$/;var re2_1b=/^(.+?)(ed|ing)$/;var re_1b_2=/.$/;var re2_1b_2=/(at|bl|iz)$/;var re3_1b_2=new RegExp("([^aeiouylsz])\\1$");var re4_1b_2=new RegExp("^"+C+v+"[^aeiouwxy]$");var re_1c=/^(.+?[^aeiou])y$/;var re_2=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;var re_3=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;var re_4=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;var re2_4=/^(.+?)(s|t)(ion)$/;var re_5=/^(.+?)e$/;var re_5_1=/ll$/;var re3_5=new RegExp("^"+C+v+"[^aeiouwxy]$");var porterStemmer=function porterStemmer(w){var stem,suffix,firstch,re,re2,re3,re4;if(w.length<3){return w;}
firstch=w.substr(0,1);if(firstch=="y"){w=firstch.toUpperCase()+w.substr(1);}
re=re_1a
re2=re2_1a;if(re.test(w)){w=w.replace(re,"$1$2");}
else if(re2.test(w)){w=w.replace(re2,"$1$2");}
re=re_1b;re2=re2_1b;if(re.test(w)){var fp=re.exec(w);re=re_mgr0;if(re.test(fp[1])){re=re_1b_2;w=w.replace(re,"");}}else if(re2.test(w)){var fp=re2.exec(w);stem=fp[1];re2=re_s_v;if(re2.test(stem)){w=stem;re2=re2_1b_2;re3=re3_1b_2;re4=re4_1b_2;if(re2.test(w)){w=w+"e";}
else if(re3.test(w)){re=re_1b_2;w=w.replace(re,"");}
else if(re4.test(w)){w=w+"e";}}}
re=re_1c;if(re.test(w)){var fp=re.exec(w);stem=fp[1];w=stem+"i";}
re=re_2;if(re.test(w)){var fp=re.exec(w);stem=fp[1];suffix=fp[2];re=re_mgr0;if(re.test(stem)){w=stem+step2list[suffix];}}
re=re_3;if(re.test(w)){var fp=re.exec(w);stem=fp[1];suffix=fp[2];re=re_mgr0;if(re.test(stem)){w=stem+step3list[suffix];}}
re=re_4;re2=re2_4;if(re.test(w)){var fp=re.exec(w);stem=fp[1];re=re_mgr1;if(re.test(stem)){w=stem;}}else if(re2.test(w)){var fp=re2.exec(w);stem=fp[1]+fp[2];re2=re_mgr1;if(re2.test(stem)){w=stem;}}
re=re_5;if(re.test(w)){var fp=re.exec(w);stem=fp[1];re=re_mgr1;re2=re_meq1;re3=re3_5;if(re.test(stem)||(re2.test(stem)&&!(re3.test(stem)))){w=stem;}}
re=re_5_1;re2=re_mgr1;if(re.test(w)&&re2.test(w)){re=re_1b_2;w=w.replace(re,"");}
if(firstch=="y"){w=firstch.toLowerCase()+w.substr(1);}
return w;};return function(token){return token.update(porterStemmer);}})();lunr.Pipeline.registerFunction(lunr.stemmer,'stemmer')/*!
* lunr.stopWordFilter
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.generateStopWordFilter=function(stopWords){var words=stopWords.reduce(function(memo,stopWord){memo[stopWord]=stopWord
return memo},{})
return function(token){if(token&&words[token.toString()]!==token.toString())return token}}
lunr.stopWordFilter=lunr.generateStopWordFilter(['a','able','about','across','after','all','almost','also','am','among','an','and','any','are','as','at','be','because','been','but','by','can','cannot','could','dear','did','do','does','either','else','ever','every','for','from','get','got','had','has','have','he','her','hers','him','his','how','however','i','if','in','into','is','it','its','just','least','let','like','likely','may','me','might','most','must','my','neither','no','nor','not','of','off','often','on','only','or','other','our','own','rather','said','say','says','she','should','since','so','some','than','that','the','their','them','then','there','these','they','this','tis','to','too','twas','us','wants','was','we','were','what','when','where','which','while','who','whom','why','will','with','would','yet','you','your'])
lunr.Pipeline.registerFunction(lunr.stopWordFilter,'stopWordFilter')/*!
* lunr.trimmer
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.trimmer=function(token){return token.update(function(s){return s.replace(/^\W+/,'').replace(/\W+$/,'')})}
lunr.Pipeline.registerFunction(lunr.trimmer,'trimmer')/*!
* lunr.TokenSet
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.TokenSet=function(){this.final=false
this.edges={}
this.id=lunr.TokenSet._nextId
lunr.TokenSet._nextId+=1}
lunr.TokenSet._nextId=1
lunr.TokenSet.fromArray=function(arr){var builder=new lunr.TokenSet.Builder
for(var i=0,len=arr.length;i<len;i++){builder.insert(arr[i])}
builder.finish()
return builder.root}
lunr.TokenSet.fromClause=function(clause){if('editDistance'in clause){return lunr.TokenSet.fromFuzzyString(clause.term,clause.editDistance)}else{return lunr.TokenSet.fromString(clause.term)}}
lunr.TokenSet.fromFuzzyString=function(str,editDistance){var root=new lunr.TokenSet
var stack=[{node:root,editsRemaining:editDistance,str:str}]
while(stack.length){var frame=stack.pop()
if(frame.str.length>0){var char=frame.str.charAt(0),noEditNode
if(char in frame.node.edges){noEditNode=frame.node.edges[char]}else{noEditNode=new lunr.TokenSet
frame.node.edges[char]=noEditNode}
if(frame.str.length==1){noEditNode.final=true}else{stack.push({node:noEditNode,editsRemaining:frame.editsRemaining,str:frame.str.slice(1)})}}
if(frame.editsRemaining>0&&frame.str.length>1){var char=frame.str.charAt(1),deletionNode
if(char in frame.node.edges){deletionNode=frame.node.edges[char]}else{deletionNode=new lunr.TokenSet
frame.node.edges[char]=deletionNode}
if(frame.str.length<=2){deletionNode.final=true}else{stack.push({node:deletionNode,editsRemaining:frame.editsRemaining-1,str:frame.str.slice(2)})}}
if(frame.editsRemaining>0&&frame.str.length==1){frame.node.final=true}
if(frame.editsRemaining>0&&frame.str.length>=1){if("*"in frame.node.edges){var substitutionNode=frame.node.edges["*"]}else{var substitutionNode=new lunr.TokenSet
frame.node.edges["*"]=substitutionNode}
if(frame.str.length==1){substitutionNode.final=true}else{stack.push({node:substitutionNode,editsRemaining:frame.editsRemaining-1,str:frame.str.slice(1)})}}
if(frame.editsRemaining>0){if("*"in frame.node.edges){var insertionNode=frame.node.edges["*"]}else{var insertionNode=new lunr.TokenSet
frame.node.edges["*"]=insertionNode}
if(frame.str.length==0){insertionNode.final=true}else{stack.push({node:insertionNode,editsRemaining:frame.editsRemaining-1,str:frame.str})}}
if(frame.editsRemaining>0&&frame.str.length>1){var charA=frame.str.charAt(0),charB=frame.str.charAt(1),transposeNode
if(charB in frame.node.edges){transposeNode=frame.node.edges[charB]}else{transposeNode=new lunr.TokenSet
frame.node.edges[charB]=transposeNode}
if(frame.str.length==1){transposeNode.final=true}else{stack.push({node:transposeNode,editsRemaining:frame.editsRemaining-1,str:charA+frame.str.slice(2)})}}}
return root}
lunr.TokenSet.fromString=function(str){var node=new lunr.TokenSet,root=node,wildcardFound=false
for(var i=0,len=str.length;i<len;i++){var char=str[i],final=(i==len-1)
if(char=="*"){wildcardFound=true
node.edges[char]=node
node.final=final}else{var next=new lunr.TokenSet
next.final=final
node.edges[char]=next
node=next
if(wildcardFound){node.edges["*"]=root}}}
return root}
lunr.TokenSet.prototype.toArray=function(){var words=[]
var stack=[{prefix:"",node:this}]
while(stack.length){var frame=stack.pop(),edges=Object.keys(frame.node.edges),len=edges.length
if(frame.node.final){words.push(frame.prefix)}
for(var i=0;i<len;i++){var edge=edges[i]
stack.push({prefix:frame.prefix.concat(edge),node:frame.node.edges[edge]})}}
return words}
lunr.TokenSet.prototype.toString=function(){if(this._str){return this._str}
var str=this.final?'1':'0',labels=Object.keys(this.edges).sort(),len=labels.length
for(var i=0;i<len;i++){var label=labels[i],node=this.edges[label]
str=str+label+node.id}
return str}
lunr.TokenSet.prototype.intersect=function(b){var output=new lunr.TokenSet,frame=undefined
var stack=[{qNode:b,output:output,node:this}]
while(stack.length){frame=stack.pop()
var qEdges=Object.keys(frame.qNode.edges),qLen=qEdges.length,nEdges=Object.keys(frame.node.edges),nLen=nEdges.length
for(var q=0;q<qLen;q++){var qEdge=qEdges[q]
for(var n=0;n<nLen;n++){var nEdge=nEdges[n]
if(nEdge==qEdge||qEdge=='*'){var node=frame.node.edges[nEdge],qNode=frame.qNode.edges[qEdge],final=node.final&&qNode.final,next=undefined
if(nEdge in frame.output.edges){next=frame.output.edges[nEdge]
next.final=next.final||final}else{next=new lunr.TokenSet
next.final=final
frame.output.edges[nEdge]=next}
stack.push({qNode:qNode,output:next,node:node})}}}}
return output}
lunr.TokenSet.Builder=function(){this.previousWord=""
this.root=new lunr.TokenSet
this.uncheckedNodes=[]
this.minimizedNodes={}}
lunr.TokenSet.Builder.prototype.insert=function(word){var node,commonPrefix=0
if(word<this.previousWord){throw new Error("Out of order word insertion")}
for(var i=0;i<word.length&&i<this.previousWord.length;i++){if(word[i]!=this.previousWord[i])break
commonPrefix++}
this.minimize(commonPrefix)
if(this.uncheckedNodes.length==0){node=this.root}else{node=this.uncheckedNodes[this.uncheckedNodes.length-1].child}
for(var i=commonPrefix;i<word.length;i++){var nextNode=new lunr.TokenSet,char=word[i]
node.edges[char]=nextNode
this.uncheckedNodes.push({parent:node,char:char,child:nextNode})
node=nextNode}
node.final=true
this.previousWord=word}
lunr.TokenSet.Builder.prototype.finish=function(){this.minimize(0)}
lunr.TokenSet.Builder.prototype.minimize=function(downTo){for(var i=this.uncheckedNodes.length-1;i>=downTo;i--){var node=this.uncheckedNodes[i],childKey=node.child.toString()
if(childKey in this.minimizedNodes){node.parent.edges[node.char]=this.minimizedNodes[childKey]}else{node.child._str=childKey
this.minimizedNodes[childKey]=node.child}
this.uncheckedNodes.pop()}}/*!
* lunr.Index
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.Index=function(attrs){this.invertedIndex=attrs.invertedIndex
this.fieldVectors=attrs.fieldVectors
this.tokenSet=attrs.tokenSet
this.fields=attrs.fields
this.pipeline=attrs.pipeline}
lunr.Index.prototype.search=function(queryString){return this.query(function(query){var parser=new lunr.QueryParser(queryString,query)
parser.parse()})}
lunr.Index.prototype.query=function(fn){var query=new lunr.Query(this.fields),matchingFields=Object.create(null),queryVectors=Object.create(null),termFieldCache=Object.create(null)
fn.call(query,query)
for(var i=0;i<query.clauses.length;i++){var clause=query.clauses[i],terms=null
if(clause.usePipeline){terms=this.pipeline.runString(clause.term)}else{terms=[clause.term]}
for(var m=0;m<terms.length;m++){var term=terms[m]
clause.term=term
var termTokenSet=lunr.TokenSet.fromClause(clause),expandedTerms=this.tokenSet.intersect(termTokenSet).toArray()
for(var j=0;j<expandedTerms.length;j++){var expandedTerm=expandedTerms[j],posting=this.invertedIndex[expandedTerm],termIndex=posting._index
for(var k=0;k<clause.fields.length;k++){var field=clause.fields[k],fieldPosting=posting[field],matchingDocumentRefs=Object.keys(fieldPosting),termField=expandedTerm+"/"+field
if(queryVectors[field]===undefined){queryVectors[field]=new lunr.Vector}
queryVectors[field].upsert(termIndex,1*clause.boost,function(a,b){return a+b})
if(termFieldCache[termField]){continue}
for(var l=0;l<matchingDocumentRefs.length;l++){var matchingDocumentRef=matchingDocumentRefs[l],matchingFieldRef=new lunr.FieldRef(matchingDocumentRef,field),metadata=fieldPosting[matchingDocumentRef],fieldMatch
if((fieldMatch=matchingFields[matchingFieldRef])===undefined){matchingFields[matchingFieldRef]=new lunr.MatchData(expandedTerm,field,metadata)}else{fieldMatch.add(expandedTerm,field,metadata)}}
termFieldCache[termField]=true}}}}
var matchingFieldRefs=Object.keys(matchingFields),results=[],matches=Object.create(null)
for(var i=0;i<matchingFieldRefs.length;i++){var fieldRef=lunr.FieldRef.fromString(matchingFieldRefs[i]),docRef=fieldRef.docRef,fieldVector=this.fieldVectors[fieldRef],score=queryVectors[fieldRef.fieldName].similarity(fieldVector),docMatch
if((docMatch=matches[docRef])!==undefined){docMatch.score+=score
docMatch.matchData.combine(matchingFields[fieldRef])}else{var match={ref:docRef,score:score,matchData:matchingFields[fieldRef]}
matches[docRef]=match
results.push(match)}}
return results.sort(function(a,b){return b.score-a.score})}
lunr.Index.prototype.toJSON=function(){var invertedIndex=Object.keys(this.invertedIndex).sort().map(function(term){return[term,this.invertedIndex[term]]},this)
var fieldVectors=Object.keys(this.fieldVectors).map(function(ref){return[ref,this.fieldVectors[ref].toJSON()]},this)
return{version:lunr.version,fields:this.fields,fieldVectors:fieldVectors,invertedIndex:invertedIndex,pipeline:this.pipeline.toJSON()}}
lunr.Index.load=function(serializedIndex){var attrs={},fieldVectors={},serializedVectors=serializedIndex.fieldVectors,invertedIndex={},serializedInvertedIndex=serializedIndex.invertedIndex,tokenSetBuilder=new lunr.TokenSet.Builder,pipeline=lunr.Pipeline.load(serializedIndex.pipeline)
if(serializedIndex.version!=lunr.version){lunr.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+lunr.version+"' does not match serialized index '"+serializedIndex.version+"'")}
for(var i=0;i<serializedVectors.length;i++){var tuple=serializedVectors[i],ref=tuple[0],elements=tuple[1]
fieldVectors[ref]=new lunr.Vector(elements)}
for(var i=0;i<serializedInvertedIndex.length;i++){var tuple=serializedInvertedIndex[i],term=tuple[0],posting=tuple[1]
tokenSetBuilder.insert(term)
invertedIndex[term]=posting}
tokenSetBuilder.finish()
attrs.fields=serializedIndex.fields
attrs.fieldVectors=fieldVectors
attrs.invertedIndex=invertedIndex
attrs.tokenSet=tokenSetBuilder.root
attrs.pipeline=pipeline
return new lunr.Index(attrs)}/*!
* lunr.Builder
* Copyright (C) 2017 Oliver Nightingale
*/
lunr.Builder=function(){this._ref="id"
this._fields=[]
this.invertedIndex=Object.create(null)
this.fieldTermFrequencies={}
this.fieldLengths={}
this.tokenizer=lunr.tokenizer
this.pipeline=new lunr.Pipeline
this.searchPipeline=new lunr.Pipeline
this.documentCount=0
this._b=0.75
this._k1=1.2
this.termIndex=0
this.metadataWhitelist=[]}
lunr.Builder.prototype.ref=function(ref){this._ref=ref}
lunr.Builder.prototype.field=function(field){this._fields.push(field)}
lunr.Builder.prototype.b=function(number){if(number<0){this._b=0}else if(number>1){this._b=1}else{this._b=number}}
lunr.Builder.prototype.k1=function(number){this._k1=number}
lunr.Builder.prototype.add=function(doc){var docRef=doc[this._ref]
this.documentCount+=1
for(var i=0;i<this._fields.length;i++){var fieldName=this._fields[i],field=doc[fieldName],tokens=this.tokenizer(field),terms=this.pipeline.run(tokens),fieldRef=new lunr.FieldRef(docRef,fieldName),fieldTerms=Object.create(null)
this.fieldTermFrequencies[fieldRef]=fieldTerms
this.fieldLengths[fieldRef]=0
this.fieldLengths[fieldRef]+=terms.length
for(var j=0;j<terms.length;j++){var term=terms[j]
if(fieldTerms[term]==undefined){fieldTerms[term]=0}
fieldTerms[term]+=1
if(this.invertedIndex[term]==undefined){var posting=Object.create(null)
posting["_index"]=this.termIndex
this.termIndex+=1
for(var k=0;k<this._fields.length;k++){posting[this._fields[k]]=Object.create(null)}
this.invertedIndex[term]=posting}
if(this.invertedIndex[term][fieldName][docRef]==undefined){this.invertedIndex[term][fieldName][docRef]=Object.create(null)}
for(var l=0;l<this.metadataWhitelist.length;l++){var metadataKey=this.metadataWhitelist[l],metadata=term.metadata[metadataKey]
if(this.invertedIndex[term][fieldName][docRef][metadataKey]==undefined){this.invertedIndex[term][fieldName][docRef][metadataKey]=[]}
this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata)}}}}
lunr.Builder.prototype.calculateAverageFieldLengths=function(){var fieldRefs=Object.keys(this.fieldLengths),numberOfFields=fieldRefs.length,accumulator={},documentsWithField={}
for(var i=0;i<numberOfFields;i++){var fieldRef=lunr.FieldRef.fromString(fieldRefs[i]),field=fieldRef.fieldName
documentsWithField[field]||(documentsWithField[field]=0)
documentsWithField[field]+=1
accumulator[field]||(accumulator[field]=0)
accumulator[field]+=this.fieldLengths[fieldRef]}
for(var i=0;i<this._fields.length;i++){var field=this._fields[i]
accumulator[field]=accumulator[field]/documentsWithField[field]}
this.averageFieldLength=accumulator}
lunr.Builder.prototype.createFieldVectors=function(){var fieldVectors={},fieldRefs=Object.keys(this.fieldTermFrequencies),fieldRefsLength=fieldRefs.length,termIdfCache=Object.create(null)
for(var i=0;i<fieldRefsLength;i++){var fieldRef=lunr.FieldRef.fromString(fieldRefs[i]),field=fieldRef.fieldName,fieldLength=this.fieldLengths[fieldRef],fieldVector=new lunr.Vector,termFrequencies=this.fieldTermFrequencies[fieldRef],terms=Object.keys(termFrequencies),termsLength=terms.length
for(var j=0;j<termsLength;j++){var term=terms[j],tf=termFrequencies[term],termIndex=this.invertedIndex[term]._index,idf,score,scoreWithPrecision
if(termIdfCache[term]===undefined){idf=lunr.idf(this.invertedIndex[term],this.documentCount)
termIdfCache[term]=idf}else{idf=termIdfCache[term]}
score=idf*((this._k1+1)*tf)/(this._k1*(1-this._b+this._b*(fieldLength/this.averageFieldLength[field]))+tf)
scoreWithPrecision=Math.round(score*1000)/1000
fieldVector.insert(termIndex,scoreWithPrecision)}
fieldVectors[fieldRef]=fieldVector}
this.fieldVectors=fieldVectors}
lunr.Builder.prototype.createTokenSet=function(){this.tokenSet=lunr.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())}
lunr.Builder.prototype.build=function(){this.calculateAverageFieldLengths()
this.createFieldVectors()
this.createTokenSet()
return new lunr.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:this._fields,pipeline:this.searchPipeline})}
lunr.Builder.prototype.use=function(fn){var args=Array.prototype.slice.call(arguments,1)
args.unshift(this)
fn.apply(this,args)}
lunr.MatchData=function(term,field,metadata){var clonedMetadata=Object.create(null),metadataKeys=Object.keys(metadata)
for(var i=0;i<metadataKeys.length;i++){var key=metadataKeys[i]
clonedMetadata[key]=metadata[key].slice()}
this.metadata=Object.create(null)
this.metadata[term]=Object.create(null)
this.metadata[term][field]=clonedMetadata}
lunr.MatchData.prototype.combine=function(otherMatchData){var terms=Object.keys(otherMatchData.metadata)
for(var i=0;i<terms.length;i++){var term=terms[i],fields=Object.keys(otherMatchData.metadata[term])
if(this.metadata[term]==undefined){this.metadata[term]=Object.create(null)}
for(var j=0;j<fields.length;j++){var field=fields[j],keys=Object.keys(otherMatchData.metadata[term][field])
if(this.metadata[term][field]==undefined){this.metadata[term][field]=Object.create(null)}
for(var k=0;k<keys.length;k++){var key=keys[k]
if(this.metadata[term][field][key]==undefined){this.metadata[term][field][key]=otherMatchData.metadata[term][field][key]}else{this.metadata[term][field][key]=this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key])}}}}}
lunr.MatchData.prototype.add=function(term,field,metadata){if(!(term in this.metadata)){this.metadata[term]=Object.create(null)
this.metadata[term][field]=metadata
return}
if(!(field in this.metadata[term])){this.metadata[term][field]=metadata
return}
var metadataKeys=Object.keys(metadata)
for(var i=0;i<metadataKeys.length;i++){var key=metadataKeys[i]
if(key in this.metadata[term][field]){this.metadata[term][field][key]=this.metadata[term][field][key].concat(metadata[key])}else{this.metadata[term][field][key]=metadata[key]}}}
lunr.Query=function(allFields){this.clauses=[]
this.allFields=allFields}
lunr.Query.wildcard=new String("*")
lunr.Query.wildcard.NONE=0
lunr.Query.wildcard.LEADING=1
lunr.Query.wildcard.TRAILING=2
lunr.Query.prototype.clause=function(clause){if(!('fields'in clause)){clause.fields=this.allFields}
if(!('boost'in clause)){clause.boost=1}
if(!('usePipeline'in clause)){clause.usePipeline=true}
if(!('wildcard'in clause)){clause.wildcard=lunr.Query.wildcard.NONE}
if((clause.wildcard&lunr.Query.wildcard.LEADING)&&(clause.term.charAt(0)!=lunr.Query.wildcard)){clause.term="*"+clause.term}
if((clause.wildcard&lunr.Query.wildcard.TRAILING)&&(clause.term.slice(-1)!=lunr.Query.wildcard)){clause.term=""+clause.term+"*"}
this.clauses.push(clause)
return this}
lunr.Query.prototype.term=function(term,options){var clause=options||{}
clause.term=term
this.clause(clause)
return this}
lunr.QueryParseError=function(message,start,end){this.name="QueryParseError"
this.message=message
this.start=start
this.end=end}
lunr.QueryParseError.prototype=new Error
lunr.QueryLexer=function(str){this.lexemes=[]
this.str=str
this.length=str.length
this.pos=0
this.start=0
this.escapeCharPositions=[]}
lunr.QueryLexer.prototype.run=function(){var state=lunr.QueryLexer.lexText
while(state){state=state(this)}}
lunr.QueryLexer.prototype.sliceString=function(){var subSlices=[],sliceStart=this.start,sliceEnd=this.pos
for(var i=0;i<this.escapeCharPositions.length;i++){sliceEnd=this.escapeCharPositions[i]
subSlices.push(this.str.slice(sliceStart,sliceEnd))
sliceStart=sliceEnd+1}
subSlices.push(this.str.slice(sliceStart,this.pos))
this.escapeCharPositions.length=0
return subSlices.join('')}
lunr.QueryLexer.prototype.emit=function(type){this.lexemes.push({type:type,str:this.sliceString(),start:this.start,end:this.pos})
this.start=this.pos}
lunr.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1)
this.pos+=1}
lunr.QueryLexer.prototype.next=function(){if(this.pos>=this.length){return lunr.QueryLexer.EOS}
var char=this.str.charAt(this.pos)
this.pos+=1
return char}
lunr.QueryLexer.prototype.width=function(){return this.pos-this.start}
lunr.QueryLexer.prototype.ignore=function(){if(this.start==this.pos){this.pos+=1}
this.start=this.pos}
lunr.QueryLexer.prototype.backup=function(){this.pos-=1}
lunr.QueryLexer.prototype.acceptDigitRun=function(){var char,charCode
do{char=this.next()
charCode=char.charCodeAt(0)}while(charCode>47&&charCode<58)
if(char!=lunr.QueryLexer.EOS){this.backup()}}
lunr.QueryLexer.prototype.more=function(){return this.pos<this.length}
lunr.QueryLexer.EOS='EOS'
lunr.QueryLexer.FIELD='FIELD'
lunr.QueryLexer.TERM='TERM'
lunr.QueryLexer.EDIT_DISTANCE='EDIT_DISTANCE'
lunr.QueryLexer.BOOST='BOOST'
lunr.QueryLexer.lexField=function(lexer){lexer.backup()
lexer.emit(lunr.QueryLexer.FIELD)
lexer.ignore()
return lunr.QueryLexer.lexText}
lunr.QueryLexer.lexTerm=function(lexer){if(lexer.width()>1){lexer.backup()
lexer.emit(lunr.QueryLexer.TERM)}
lexer.ignore()
if(lexer.more()){return lunr.QueryLexer.lexText}}
lunr.QueryLexer.lexEditDistance=function(lexer){lexer.ignore()
lexer.acceptDigitRun()
lexer.emit(lunr.QueryLexer.EDIT_DISTANCE)
return lunr.QueryLexer.lexText}
lunr.QueryLexer.lexBoost=function(lexer){lexer.ignore()
lexer.acceptDigitRun()
lexer.emit(lunr.QueryLexer.BOOST)
return lunr.QueryLexer.lexText}
lunr.QueryLexer.lexEOS=function(lexer){if(lexer.width()>0){lexer.emit(lunr.QueryLexer.TERM)}}
lunr.QueryLexer.termSeparator=lunr.tokenizer.separator
lunr.QueryLexer.lexText=function(lexer){while(true){var char=lexer.next()
if(char==lunr.QueryLexer.EOS){return lunr.QueryLexer.lexEOS}
if(char.charCodeAt(0)==92){lexer.escapeCharacter()
continue}
if(char==":"){return lunr.QueryLexer.lexField}
if(char=="~"){lexer.backup()
if(lexer.width()>0){lexer.emit(lunr.QueryLexer.TERM)}
return lunr.QueryLexer.lexEditDistance}
if(char=="^"){lexer.backup()
if(lexer.width()>0){lexer.emit(lunr.QueryLexer.TERM)}
return lunr.QueryLexer.lexBoost}
if(char.match(lunr.QueryLexer.termSeparator)){return lunr.QueryLexer.lexTerm}}}
lunr.QueryParser=function(str,query){this.lexer=new lunr.QueryLexer(str)
this.query=query
this.currentClause={}
this.lexemeIdx=0}
lunr.QueryParser.prototype.parse=function(){this.lexer.run()
this.lexemes=this.lexer.lexemes
var state=lunr.QueryParser.parseFieldOrTerm
while(state){state=state(this)}
return this.query}
lunr.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]}
lunr.QueryParser.prototype.consumeLexeme=function(){var lexeme=this.peekLexeme()
this.lexemeIdx+=1
return lexeme}
lunr.QueryParser.prototype.nextClause=function(){var completedClause=this.currentClause
this.query.clause(completedClause)
this.currentClause={}}
lunr.QueryParser.parseFieldOrTerm=function(parser){var lexeme=parser.peekLexeme()
if(lexeme==undefined){return}
switch(lexeme.type){case lunr.QueryLexer.FIELD:return lunr.QueryParser.parseField
case lunr.QueryLexer.TERM:return lunr.QueryParser.parseTerm
default:var errorMessage="expected either a field or a term, found "+lexeme.type
if(lexeme.str.length>=1){errorMessage+=" with value '"+lexeme.str+"'"}
throw new lunr.QueryParseError(errorMessage,lexeme.start,lexeme.end)}}
lunr.QueryParser.parseField=function(parser){var lexeme=parser.consumeLexeme()
if(lexeme==undefined){return}
if(parser.query.allFields.indexOf(lexeme.str)==-1){var possibleFields=parser.query.allFields.map(function(f){return "'"+f+"'"}).join(', '),errorMessage="unrecognised field '"+lexeme.str+"', possible fields: "+possibleFields
throw new lunr.QueryParseError(errorMessage,lexeme.start,lexeme.end)}
parser.currentClause.fields=[lexeme.str]
var nextLexeme=parser.peekLexeme()
if(nextLexeme==undefined){var errorMessage="expecting term, found nothing"
throw new lunr.QueryParseError(errorMessage,lexeme.start,lexeme.end)}
switch(nextLexeme.type){case lunr.QueryLexer.TERM:return lunr.QueryParser.parseTerm
default:var errorMessage="expecting term, found '"+nextLexeme.type+"'"
throw new lunr.QueryParseError(errorMessage,nextLexeme.start,nextLexeme.end)}}
lunr.QueryParser.parseTerm=function(parser){var lexeme=parser.consumeLexeme()
if(lexeme==undefined){return}
parser.currentClause.term=lexeme.str.toLowerCase()
if(lexeme.str.indexOf("*")!=-1){parser.currentClause.usePipeline=false}
var nextLexeme=parser.peekLexeme()
if(nextLexeme==undefined){parser.nextClause()
return}
switch(nextLexeme.type){case lunr.QueryLexer.TERM:parser.nextClause()
return lunr.QueryParser.parseTerm
case lunr.QueryLexer.FIELD:parser.nextClause()
return lunr.QueryParser.parseField
case lunr.QueryLexer.EDIT_DISTANCE:return lunr.QueryParser.parseEditDistance
case lunr.QueryLexer.BOOST:return lunr.QueryParser.parseBoost
default:var errorMessage="Unexpected lexeme type '"+nextLexeme.type+"'"
throw new lunr.QueryParseError(errorMessage,nextLexeme.start,nextLexeme.end)}}
lunr.QueryParser.parseEditDistance=function(parser){var lexeme=parser.consumeLexeme()
if(lexeme==undefined){return}
var editDistance=parseInt(lexeme.str,10)
if(isNaN(editDistance)){var errorMessage="edit distance must be numeric"
throw new lunr.QueryParseError(errorMessage,lexeme.start,lexeme.end)}
parser.currentClause.editDistance=editDistance
var nextLexeme=parser.peekLexeme()
if(nextLexeme==undefined){parser.nextClause()
return}
switch(nextLexeme.type){case lunr.QueryLexer.TERM:parser.nextClause()
return lunr.QueryParser.parseTerm
case lunr.QueryLexer.FIELD:parser.nextClause()
return lunr.QueryParser.parseField
case lunr.QueryLexer.EDIT_DISTANCE:return lunr.QueryParser.parseEditDistance
case lunr.QueryLexer.BOOST:return lunr.QueryParser.parseBoost
default:var errorMessage="Unexpected lexeme type '"+nextLexeme.type+"'"
throw new lunr.QueryParseError(errorMessage,nextLexeme.start,nextLexeme.end)}}
lunr.QueryParser.parseBoost=function(parser){var lexeme=parser.consumeLexeme()
if(lexeme==undefined){return}
var boost=parseInt(lexeme.str,10)
if(isNaN(boost)){var errorMessage="boost must be numeric"
throw new lunr.QueryParseError(errorMessage,lexeme.start,lexeme.end)}
parser.currentClause.boost=boost
var nextLexeme=parser.peekLexeme()
if(nextLexeme==undefined){parser.nextClause()
return}
switch(nextLexeme.type){case lunr.QueryLexer.TERM:parser.nextClause()
return lunr.QueryParser.parseTerm
case lunr.QueryLexer.FIELD:parser.nextClause()
return lunr.QueryParser.parseField
case lunr.QueryLexer.EDIT_DISTANCE:return lunr.QueryParser.parseEditDistance
case lunr.QueryLexer.BOOST:return lunr.QueryParser.parseBoost
default:var errorMessage="Unexpected lexeme type '"+nextLexeme.type+"'"
throw new lunr.QueryParseError(errorMessage,nextLexeme.start,nextLexeme.end)}};(function(root,factory){if(typeof define==='function'&&define.amd){define(factory)}else if(typeof exports==='object'){module.exports=factory()}else{root.lunr=factory()}}(this,function(){return lunr}))})();