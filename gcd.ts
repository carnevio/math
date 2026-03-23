export function gcdBruteForce(a: number, b: number): number {
	const min = Math.min(Math.abs(a), Math.abs(b));
	for (let i = min; i >= 1; i--) {
		if (a % i === 0 && b % i === 0) {
			return i;
		}
	}
	return 1;
}
