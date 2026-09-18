type InterestFormProps = {
  endpoint: string;
  source: "about-page" | "events-page" | "footer";
};

export function InterestForm({ endpoint, source }: InterestFormProps) {
  return (
    <form className="interest-form" action={endpoint} method="post">
      <input type="hidden" name="source" value={source} />
      <div className="form-field">
        <label htmlFor={`${source}-name`}>Name</label>
        <input id={`${source}-name`} name="name" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor={`${source}-email`}>Email</label>
        <input id={`${source}-email`} name="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-field">
        <label htmlFor={`${source}-role`}>What best describes your work?</label>
        <select id={`${source}-role`} name="role" required defaultValue="">
          <option value="" disabled>
            Select a role
          </option>
          <option>Research</option>
          <option>Engineering</option>
          <option>Manufacturing</option>
          <option>Quality</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor={`${source}-organization`}>
          Organization <span>(optional)</span>
        </label>
        <input id={`${source}-organization`} name="organization" autoComplete="organization" />
      </div>
      <fieldset>
        <legend>What are you interested in?</legend>
        {["Workshops", "Research updates", "Open-source quality", "Participating in OpenDQM"].map(
          (interest) => (
            <label className="check-field" key={interest}>
              <input type="checkbox" name="interests" value={interest} />
              {interest}
            </label>
          )
        )}
      </fieldset>
      <label className="check-field consent-field">
        <input type="checkbox" name="consent" value="yes" required />I agree to receive OpenDQM
        updates. I can unsubscribe at any time.
      </label>
      <button className="button button-primary" type="submit">
        Keep me updated
      </button>
    </form>
  );
}
