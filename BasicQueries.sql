/*
 * SQL Queries to answer the questions from milestone 1
 */

/*
 * Query 1: If I prioritize raising a family (education and crime), where is
 * the best city to raise a family?
 */

 SELECT C.name
 FROM County C JOIN Map M ON C.id = Map.fips
               JOIN State S ON S.id = Map.state
 ORDER BY C.crime, S.act_score

/*
 * Query 2: If I want to buy a new vacation home (sunny weather, low crime,
 * wealthy neighbors) where should I be looking?
 */

 SELECT C.name
 FROM County C JOIN Map M ON C.id = Map.fips
               JOIN State S ON S.id = Map.state
 ORDER BY C.crime, S.act_score
 
 /*
  * Query 3: Where are the places with the highest “bang for buck” in terms of
  * education (education vs. wealth ratio)?
  */

 /*
  * Query 4: How correlated are weather and crime?
  */

/*
 * Query 5: Where can I relocate to be with similar people to me
 * (wealth, education, political preference)?
 */

 /*
  * Query 6: How correlated are political preference, education, and wealth?
  */

  /*
   * Query 7: How can I find corresponding cities / suburbs within states that
   * I align with?
   */
