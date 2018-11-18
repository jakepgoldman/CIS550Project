/*
 * SQL Queries to answer the questions from milestone 1
 */

/*
 * Query 1: If I prioritize raising a family (education and crime), where is
 * the best city to raise a family?
 */

 SELECT C.name
 FROM County C JOIN Map M ON C.id = Map.fips
               JOIN State S ON S.abbr = Map.state_abbr
 ORDER BY C.crime, S.act_score

/*
 * Query 2: If I want to buy a new vacation home (sunny weather, low crime,
 * wealthy neighbors) where should I be looking?
 */

 SELECT Y.name
 FROM City Y JOIN Map M ON Y.cbsa_name = M.cbsa_name
 ORDER BY Y.crime_metro, Y.precipitation

/*
* Query 3(a) (Updated): Which cities have had continually increasing prices
* from 2015-2019?
*/

  WITH Increases AS (
    SELECT H2.fips, H2.year
    FROM Housing H1 JOIN Housing H2 ON (H1.year + 1) = H2.year
    WHERE H2.fmr2 > H1.fmr2
  )
  SELECT I.fips
  FROM Increases I
  GROUP BY I.fips
  HAVING COUNT(*) = 4

/*
 * Query 3(b) (Updated): Which cities have had continually decreasing prices
 * from 2015-2019?
 */

   WITH Decreases AS (
     SELECT H2.fips, H2.year
     FROM Housing H1 JOIN Housing H2 ON (H1.year + 1) = H2.year
     WHERE H2.fmr2 < H1.fmr2
   )
   SELECT D.fips
   FROM Decreases I
   GROUP BY D.fips
   HAVING COUNT(*) = 4

 /*
  * Query 3(c) (Updated): Order counties by the number of average annual
  * rent increases.
  */

  WITH Increases AS (
    SELECT H2.fips, H2.year
    FROM Housing H1 JOIN Housing H2 ON (H1.year + 1) = H2.year
    WHERE H2.fmr2 > H1.fmr2
  )
  SELECT I.fips, COUNT(*) as num_increases
  FROM Increases I
  GROUP BY I.fips
  ORDER BY num_increases DESC

 /*
  * Query 4 (Updated): Find the lowest crime city in each state.
  */

  WITH MinCrimes AS (
    SELECT Y.state, min(Y.crime) as min_crime
    FROM City Y
    GROUP BY Y.state
  )
  SELECT C.state, C.cbsa_name
  FROM City C JOIN MinCrimes M ON C.state_abbr = M.state_abbr
  WHERE C.crime = M.min_crime

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
